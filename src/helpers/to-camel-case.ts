/**
 * pretty ugly but converts all the following into camelCase
 * -- snake_case -> camelCase
 * -- kebab-case -> camelCase
 * -- PascalCase -> camelCase
 */
export const toCamelCase = (str: string) => {
    if (typeof str !== "string") return str;
    if (/(?:_)|(?:-)/.test(str)) {
        // we this word is most likely snake_case
        return str
            .toLowerCase()
            .replace(/([-_][a-z])/g, (group) =>
                group.toUpperCase().replace("-", "").replace("_", "")
            );
    }
    return str
        .replace(/(?:^\w|[A-Z]|[_-]|\b\w)/g, (word, index) => {
            return index === 0 ? word.toLowerCase() : word.toUpperCase();
        })
        .replace(/\s+/g, "");
};

console.log(toCamelCase("kebab-case"));
