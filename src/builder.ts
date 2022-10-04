interface Object {
    [key: string]: string;
}
interface Builder {
    tree: {
        [key: string]: string | Object;
    };
    mutator?: (property: string) => string;
}
export const builder = ({ tree, mutator }: Builder) => {
    let xml = "";
    const dataTree = Object.entries(tree);
    dataTree.map((entry) => {
        const key = entry[0];
        const content = entry[1];
        xml += `<${mutator ? mutator(key) : key}>${
            typeof content === "object"
                ? builder({ tree: content, mutator })
                : content
        }</${mutator ? mutator(key) : key}>`;
    });
    return xml;
};
