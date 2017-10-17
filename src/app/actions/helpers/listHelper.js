import numeral from "numeral";

export function createList(template, total, padding) {
    let list = [];
    const format = (new Array(parseInt(padding || 0))).fill(0).join("");
    for (let i = 0; i < parseInt(total); i++) {
        const url = template.replace("(*)", numeral(i + 1).format(format));
        list.push(url);
    }
    return list;
}