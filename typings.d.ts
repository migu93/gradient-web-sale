declare global {
    interface NodeRequire {
        context(
            directory: string,
            useSubdirectories?: boolean,
            regExp?: RegExp
        ): {
            keys(): string[];
            <T>(id: string): T;
            resolve(id: string): string;
        };
    }
}