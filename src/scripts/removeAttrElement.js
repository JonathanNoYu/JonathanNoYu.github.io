function removeAttrElement(element, remove_attr) {
    if (document.getElementById(element) != null) {
        const el = document.getElementById(element);
        var attr = el.getAttribute("class")
        attr = attr.replace(remove_attr,"")
        el.setAttribute("class", attr)
    }
} export default removeAttrElement