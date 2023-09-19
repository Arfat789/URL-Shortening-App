const input = document.querySelector('input')
const validButton = document.getElementById('valid-btn')
const errorText = document.getElementById('errorText')
const linkContainer = document.getElementById('linkContainer')
const copy = document.querySelectorAll('copy')
const hamBurger = document.getElementById('hamburger')
const topBar = document.querySelector('.top-bar')


















let linkArray = []
async function fetchData(link) {
  const url = 'https://api.shrtco.de/v2/shorten?url=' + link;
  try {
    const response = await fetch(url); // Replace with your API URL
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
  
}


validButton.addEventListener('click', async()=>{
  if(input.value === ''){
      input.style.border = "2px solid red";
      errorText.textContent = 'Please add a link'
  }else{
      errorText.textContent = "";
      input.style.border = ""; 
      addToList()
  }
})







async function addToList(){
  try {
    let data = await fetchData(input.value);
    linkArray.push({link:data.result.short_link, fullLink:input.value})
    input.value = '';
    linkContainer.innerHTML = ''
    linkArray.forEach(item =>{
      const linkBox = document.createElement('div')
      linkBox.classList.add('link-box')
      linkBox.innerHTML  =  `
      <p class="link"  id="main-link">${item.link}</p>
      <div class="right-div flex">
      <p >${item.fullLink}</p>
      <button class="copy">copy</button>
      </div>`;
      linkContainer.appendChild(linkBox)

      
     
    })

for(i of linkContainer.children){
  i.querySelector('div').querySelectorAll('button').forEach(element => {
    
    element.addEventListener('click',()=>{
      let link = element.parentElement.parentElement.querySelector('.link').textContent;
      console.log(link)
      copyToClipboard(link)
    
      element.textContent = 'Copied'
      element.style.backgroundColor = 'hsl(257, 27%, 26%)'
  
    })
    
  });
}
  } catch (error) {
    console.error('Error in fetchData:', error);
    input.style.border = "2px solid red";
    errorText.textContent = 'Please enter a valid url'

  }
}


function copyToClipboard(text) {
  // Create a new input element
  const input = document.createElement("input");
  
  // Set its value to the text
  input.value = text;
  
  // Append it to the document
  document.body.appendChild(input);
  
  // Select the text in the input field
  input.select();
  
  // Copy the selected text to the clipboard
  document.execCommand("copy");
  
  // Remove the temporary input element
  document.body.removeChild(input);
}


input.addEventListener('keydown', function (event) {
  // Check if the pressed key is Enter (key code 13)
  if (event.keyCode === 13) {
    // Perform your action here
    // For example, you can call a function or submit a form
    event.preventDefault();
    if(input.value === ''){
      input.style.border = "2px solid red";
      errorText.textContent = 'Please add a link'
  }else{
      errorText.textContent = "";
      input.style.border = ""; 
      addToList()
     
  }
  }
});

hamBurger.addEventListener('click',()=>{
  console.log('clicked')
   topBar.classList.toggle('active')
})