import mongoose from "mongoose";
import Repository from "../types/interfaces/Repository";
import { unmanaged, injectable } from "inversify";

@injectable()
abstract class BaseRepository<T> implements Repository<T> {
    public readonly _model: mongoose.Model<T & mongoose.Document>;

    constructor(@unmanaged() modelName: string) {
        this._model = mongoose.model<T & mongoose.Document>(modelName);
    }

    public async getAll(): Promise<T[]> {
        let result = await this._model
            .find()
            .select("-__v")
            .exec();

        result = result.map(r => r.toObject());

        return result;
    }

    public async findById(id: string): Promise<T> {
        const result = await (
            await this._model
                .findById(id)
                .select("-__v")
                .exec()
        ).toObject();

        return result;
    }


    public async find(item: T): Promise<T[]> {
        let result = await this._model
            .find(item)
            .select("-__v")
            .exec();

        result = result.map(r => r.toObject());

        return result;
    }

    public async create(item: T): Promise<T> {
        let result = await this._model.create(item);

        result = result.toObject();

        return result;
    }

    public async update(id: string, item: T): Promise<T> {
        const result = await (
            await this._model
                .findByIdAndUpdate(id, item)
                .select("-__v")
                .exec()
        ).toObject();

        return result;
    }

    public async delete(item: T): Promise<T[]> {
        let itemsToDelete = await this._model
            .find(item)
            .select("-__v")
            .exec();
        itemsToDelete = itemsToDelete.map(r => r.toObject());

        await this._model.deleteMany(item).exec();

        return itemsToDelete;
    }
}

export default BaseRepository;
