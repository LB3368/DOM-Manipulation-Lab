let mainEl = document.querySelector("main")
mainEl.style.backgroundColor = 'var(--main-bg)'

mainEl.innerHTML = '<h1>SEI Rocks!</h1>'

mainEl.classList.add('flex-ctr')



let topMenuEl = document.querySelector("#top-menu")
topMenuEl.style.height = "100%"
topMenuEl.style.backgroundColor = 'var(--top-menu-bg)'
topMenuEl.classList.add('flex-around')


var menuLinks = [
    {text: 'about', href: '/about'},
    {text: 'catalog', href: '#', subLinks: [
      {text: 'all', href: '/catalog/all'},
      {text: 'top selling', href: '/catalog/top'},
      {text: 'search', href: '/catalog/search'},
    ]},
    {text: 'orders', href: '#' , subLinks: [
      {text: 'new', href: '/orders/new'},
      {text: 'pending', href: '/orders/pending'},
      {text: 'history', href: '/orders/history'},
    ]},
    {text: 'account', href: '#', subLinks: [
      {text: 'profile', href: '/account/profile'},
      {text: 'sign out', href: '/account/signout'},
    ]},
  ];

let aEl
  // iterates over the ENTIRE menulinks array for each "link" object
for(let count = 0; count < menuLinks.length; count++) {
    // creates an <a> element
 aEl = document.createElement('a')
 //Sets the new element's content to the value of the text property of the "LINK" object
 aEl.setAttribute("href", menuLinks[count].href)

 //Appends new element to the "topMenu" element(topMenuEl)
 aEl.textContent = menuLinks[count].text
 topMenuEl.append(aEl)
}

let subMenuEl = document.getElementById("sub-menu")

subMenuEl.style.height = '100%'

subMenuEl.style.backgroundColor = 'var(--sub-menu-bg)'

subMenuEl.classList.add('flex-around')

subMenuEl.style.position = "absolute"

subMenuEl.style.top = "0"

let topMenuLinks = topMenuEl.getElementsByTagName('a')

//let topMenuLinks = topMenuEl.querySelectorAll('a') // does same thing as above to select all the <a> tags

let showingSubMenu = false


function handleClick(evt) {
    evt.preventDefault()
    if(evt.target.tagName === "A") {
        console.log("a was clicked")
        console.log(evt)
        console.log(evt.target.textContent)

        if (evt.target.classList.contains('active')) {
            evt.target.classList.remove('active')

            showingSubMenu = false

            subMenuEl.style.top = '0'
            // 5.3.4 - return to exit
            return
        }
// 5.4
        let aLinks = document.querySelectorAll('#top-menu > a')
        aLinks.forEach(function(elem) {
            elem.classList.remove('active')
        //console.log(evt)
           
        })
        //console.log(aLinks)

// 5.5
        evt.target.classList.add('active')
        console.log(evt.target)

        let linkObj = menuLinks.find(function(obj) {
            return obj.text === evt.target.textContent
        })
        console.log(linkObj)

        function buildSubMenu(linkObj) {
            subMenuEl.innerHTML = ""
            linkObj.subLinks.forEach(function(currentLink) {
                let link = document.createElement('a')
                link.setAttribute('href', currentLink.href)
                link.textContent = currentLink.text
                subMenuEl.append(link)

               
            })
            subMenuEl.addEventListener('click', function(evt2) {
                evt2.preventDefault()
                if(evt2.target.matches('a') ) {
                    console.log(evt2.target)
                }else {
                    return
                }

                showingSubMenu = false
                subMenuEl.style.top = '0'
                let aLinksAgain = document.querySelectorAll("#top-menu > a")
                aLinksAgain.forEach(function(elem) {
                    elem.classList.remove('active')
                })
                mainEl.innerHTML = `<h1>${evt2.target.textContent}`
            })
        }

        if(evt.target.getAttribute('href') === "#") {
            showingSubMenu = true
            buildSubMenu(linkObj)
            subMenuEl.style.top = '100%'


        }else {
            showingSubMenu = false
            subMenuEl.style.top = '0'
        }

    } else {
        return // returns if element clicked is not an <a> tag
    }  
    //console.log(evt)
       
    //if (evt.target.matches('a')) {
        //console.log("an a tag")
    //} else {
        //console.log('not an a tag')
    //}
}


topMenuEl.addEventListener('click', handleClick)

console.log(topMenuEl)

topMenuLinks.remove("active")

