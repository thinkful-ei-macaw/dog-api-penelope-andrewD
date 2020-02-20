'use strict';


function getDogImage(dogNumber) {
  fetch(`https://dog.ceo/api/breeds/image/random/${dogNumber}`)
    .then(response => response.json())
    .then(responseJson => 
      displayResults(responseJson))
    .catch(error => alert('Something went wrong. Try again later.'));
}

function tooManyImageResults(dogNumber) {
  if(dogNumber > 50) {
    throw new Error('Number is too big. Try again');
  }
  if(dogNumber < 1) {
    throw new Error('Number is too small. Try again');
  }
}

function displayResults(responseJson) {
  console.log(responseJson);
  //replace the existing image with the new one
  let imageStr = '';
  responseJson.message.forEach(image => {
    imageStr += `<img src="${image}"><br>`;
  })
  
  $('.display').html(imageStr);



  // $('.results-img').replaceWith(
  //   `<img src="${responseJson.message}" class="results-img">`
  // )


  //display the results section
  $('.results').removeClass('hidden');
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();

    const dogNumber = $('#dogs').val();
    try {
    tooManyImageResults(dogNumber);
    getDogImage(dogNumber);
    }
    catch(error) {
      alert(error.message);
    }
  });
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});