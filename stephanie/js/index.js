/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */

if(!document.getElementById("sidebar").classList.contains('expand') && !document.getElementById("sidebar").classList.contains('shrink')){
    document.getElementById("sidebar").classList.add('shrink');
}



function toggleSidebar() {
    if(document.getElementById("sidebar").classList.contains('expand')){
        document.getElementById("sidebar").classList.remove('expand');
        document.getElementById("sidebar").classList.add('shrink');
        document.getElementById("content").classList.remove('adjust');
    }
    else {
        document.getElementById("sidebar").classList.add('expand');
        document.getElementById("sidebar").classList.remove('shrink');
        document.getElementById("content").classList.add('adjust');
    }
}