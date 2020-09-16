import { injectable, unmanaged } from 'inversify';
import mongoose, { Schema } from 'mongoose';
import Repository from '../types/interfaces/Repository';
import EntityNotFoundError from '../types/exceptions/EntityNotFoundError';

@injectable()
class BaseRepository<T> implements Repository<T> {
    public readonly _model: mongoose.Model<T & mongoose.Document>;

    constructor(@unmanaged() modelName: string) {
        this._model = mongoose.model<T & mongoose.Document>(modelName);
    }

    private updateQueryIsActive(obj: T): void {
        // @ts-ignore
        if (this._model.schema.paths['isActive']) {
            const isActiveResult = this.getActiveValue(options.isActive);
            if (isActiveResult !== null) {
                // @ts-ignore
                obj.isActive = isActiveResult;
            }
        }
    }

    private getActiveValue(isActiveValue: string | boolean) {
        if (!isActiveValue && isActiveValue !== undefined) {
            return false;
        } else if (isActiveValue !== 'all') {
            return true;
        }
        return null;
    }

    private localize(obj: T, locale = ''): T {
        // if (!locale) {
        //     // @ts-ignore
        //     delete obj.languageSpecificFields;
        //     return obj;
        // }
        if (locale === 'all') {
            return obj;
        }
        // @ts-ignore
        if (locale && obj.languageSpecificFields) {
            // @ts-ignore
            const lang = obj.languageSpecificFields.filter(
                (f: LanguageVariation) => f.language === locale
            );

            lang.forEach((l: LanguageVariation) => {
                if (Object.prototype.hasOwnProperty.call(obj, l.field)) {
                    // @ts-ignore
                    obj[l.field] = l.value;
                }
            });

            // @ts-ignore
            delete obj.languageSpecificFields;
        }
        const values = Object.values(obj);
        values.forEach(value => {
            if (
                value &&
                typeof value === 'object' &&
                !(value instanceof Date) &&
                !value._bsontype
            ) {
                if (Array.isArray(value)) {
                    value.forEach(v => this.localize(v, locale));
                } else {
                    this.localize(value, locale);
                }
            }
        });
        if (!locale) {
            // @ts-ignore
            delete obj.languageSpecificFields;
        }
        return obj;
    }

    private cleanObject(obj: T): T {
        for (const propName in obj) {
            if (obj[propName] === null || obj[propName] === undefined) {
                delete obj[propName];
            }
        }
        return obj;
    }

    public async getAll(options: DataOptions = {}): Promise<T[]> {
        return await this.find({} as T, options);
    }

    public async findById(id: string, options: DataOptions = {}): Promise<T> {
        this.excludeVersion(
            options.excludeFields,
            options.populators,
            options.isActive
        );
        const result = await this._model
            .findById(id)
            .populate(options.populators)
            .select(options.excludeFields)
            .exec();
        if (!result) {
            throw new EntityNotFoundError("Can't find enitity with such id");
        }
        return this.localize(result.toObject(), options.lang);
    }

    public async find(item: T, options: DataOptions = {}): Promise<T[]> {
        this.updateQueryIsActive(item, options);
        this.excludeVersion(
            options.excludeFields,
            options.populators,
            options.isActive
        );
        const result = await this._model
            .find(item)
            .skip(options.skip)
            .limit(options.limit)
            .populate(options.populators)
            .select(options.excludeFields)
            .sort(options.sort)
            .exec();
        if (!result) {
            throw new EntityNotFoundError(
                "Can't find enities with such parameters"
            );
        }
        return result.map(r => this.localize(r.toObject(), options.lang));
    }

    public async findOne(item: T, options: DataOptions = {}): Promise<T> {
        this.updateQueryIsActive(item, options);
        this.excludeVersion(
            options.excludeFields,
            options.populators,
            options.isActive
        );
        const result = await this._model
            .findOne(item)
            .populate(options.populators)
            .select(options.excludeFields)
            .exec();
        if (!result) {
            throw new EntityNotFoundError(
                "Can't find enity with such parameters"
            );
        }

        return this.localize(result.toObject(), options.lang);
    }

    public async findOneIfPresent(
        item: T,
        options: DataOptions = {}
    ): Promise<T> {
        this.updateQueryIsActive(item, options);
        this.excludeVersion(
            options.excludeFields,
            options.populators,
            options.isActive
        );
        const result = await this._model
            .findOne(item)
            .populate(options.populators)
            .select(options.excludeFields)
            .exec();
        if (!result) {
            return null;
        }
        return this.localize(result.toObject(), options.lang);
    }

    public async create(item: T, options: DataOptions = {}): Promise<T> {
        const result = await this._model.create(item);
        return result.toObject();
    }

    public async update(
        id: string,
        item: T,
        options: DataOptions = {}
    ): Promise<T> {
        const updatedObj = this.cleanObject(item);
        const result = await this._model
            .findByIdAndUpdate(id, updatedObj, {
                runValidators: true,
                context: 'query',
                new: true,
                strict: false
            })
            .select('-__v')
            .exec();
        if (!result) {
            throw new EntityNotFoundError("Can't find enitity with such id");
        }
        return this.localize(result.toObject(), options.lang);
    }

    public async delete(item: T): Promise<T[]> {
        let itemsToDelete = await this._model
            .find(item)
            .select('-__v')
            .exec();
        if (!itemsToDelete) {
            throw new EntityNotFoundError("Can't find enitites");
        }
        itemsToDelete = itemsToDelete.map(r => r.toObject());

        await this._model.deleteMany(item).exec();

        return itemsToDelete;
    }
}

export default BaseRepository;
