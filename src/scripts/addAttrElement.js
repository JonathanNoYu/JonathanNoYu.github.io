function addAttrElement(element, new_attr) {
    if (document.getElementById(element) != null) {
        const el = document.getElementById(element);
        const attr = el.getAttribute("class")
        if (!attr.includes(new_attr)) {
            el.setAttribute("class", attr + new_attr)
        }
    }
} export default addAttrElement