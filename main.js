
document.querySelector('button').addEventListener('click', getFetch)

function getFetch(){
  const choice = document.querySelector('input').value

  let today = new Date();
  if (today < Date.parse(choice)) {
    document.querySelector('h4').style.display = "initial"
    document.querySelector('h4').innerText = "That is a future date! Please choose another.";
  }
  if (today >= Date.parse(choice)) {
    document.querySelector('h4').style.display = "none"



  const url = `https://api.nasa.gov/planetary/apod?api_key=utSrcGjneqgVosQrxHGeKuFeSRbzvcPoxqodo2xb&date=${choice}`
  
  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        if (data.media_type === 'image'){
          document.querySelector('img').style.display = "flex";
          document.querySelector('img').src = data.hdurl; 
          document.querySelector('iframe').style.display = "none";
        }else if(data.media_type === 'video'){
          document.querySelector('img').style.display = "none";
          document.querySelector('iframe').style.display = "block";
          document.querySelector('iframe').src = data.url;
        }
        document.querySelector('h2').style.visibility = "visible";
        document.querySelector('h3').style.visibility = "visible";

        document.querySelector('h2').innerText = data.title;
        document.querySelector('h3').innerText = data.explanation;
        if (data.copyright) {
          document.querySelector('h5').innerText = "Artist: " + data.copyright;
          document.querySelector('h5').style.visibility = "visible";
        }else{
          document.querySelector('h5').style.visibility = "hidden";
        }
      })
      .catch(err => {
          console.log(`error ${err}`);
      });}

}


document.getElementById('datePickerID').max = new Date().toLocaleDateString('en-ca');
