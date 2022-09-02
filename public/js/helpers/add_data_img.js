export default function addDataImage ({element,img,name}){
    element.src = img;
    element.alt = name;
    element.setAttribute("referrerpolicy","no-referrer");
    return element;
}