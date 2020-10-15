interface Repository<T> {
    getAll(): Promise<T[]>;
    findById(id: string): Promise<T>;
    find(item: T): Promise<T[]>;
    create(item: T): Promise<T>;
    update(id: string, item: T): Promise<T>;
    delete(item: T): Promise<T[]>;
}

export default Repository;
