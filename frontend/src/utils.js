
const parseURL = () =>{
    let requestURL = document.location.hash.toLowerCase();
    requestURL = requestURL.split("/");
    return {
        resource: requestURL[1],
        id: requestURL[2],
        action: requestURL[3]
    };
};

export const rerender = async(component)=>{
    const main_container = document.getElementById('main-container');
    main_container.innerHTML = await component.render();
    await component.after_render();
}

export default parseURL;