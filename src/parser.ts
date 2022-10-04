interface Parser {
    xml: string;
    mutator?: (property: string) => string;
}
interface Object {
    [key: string]: string | Object;
}
export const parser = ({ xml, mutator }: Parser) => {
    const jsonData: Object = {};
    for (const result of xml.matchAll(
        /(?:<(\w*)(?:\s[^>]*)*>)((?:(?!<\1).)*)(?:<\/\1>)|<(\w*)(?:\s*)*\/>/gm
    )) {
        const key = result[1] || result[3];
        const value = result[2] && parser({ xml: result[2], mutator });
        const resolvedValue =
            (value && Object.keys(value).length ? value : result[2]) || "";
        jsonData[mutator ? mutator(key) : key] = resolvedValue;
    }
    return jsonData;
};
