 function getBusStops(){
  var inputVal = document.getElementById("myInput").value;
    
    const url= `https://cors.bridged.cc/https://api.sl.se/api2/typeahead.json?key=f9fb2330e98546d98c027831b97937e4&searchstring=${inputVal}&stationsonly=True&maxresults=10`;
    fetch(url)
    .then((resp)=>resp.json())
    .then(function(data){
      console.log("WORKING")
      
      var station;

      station = data.ResponseData[0]
      showNextDeparture(station.SiteId, station.Name)
      
    })
        .catch(error => {
            if (typeof error.json === "function") {
                error.json().then(jsonError => {
                    console.log("Json error from API");
                    console.log(jsonError);
                }).catch(genericError => {
                    console.log("Generic error from API");
                    console.log(error.statusText);
                });
            } else {
                console.log("Fetch error");
                console.log(error);
            }
        })
};


function showNextDeparture(siteId, Name){
  
  const url= `https://cors.bridged.cc/https://api.sl.se/api2/realtimedeparturesV4.json?key=b358acfbac7444f5b4160a89e4e44182&siteid=${siteId}&timewindow=20`;
  fetch(url)
  .then((resp)=>resp.json())
  .then(function(data){
    console.log("WORKING")
    console.log(data.ResponseData)
    var empty =  document.getElementById("test")
    empty.innerHTML = "";
    var header =document.getElementById("currentStation")
    header.innerHTML = "";
     header.innerHTML = Name;
     var currentTransport;
     if(document.getElementById('subway').checked)
     {
      currentTransport = data.ResponseData.Metros.length;
    }
     else if(document.getElementById('train').checked)
     {
      currentTransport = data.ResponseData.Trains.length;
    }
     else if(document.getElementById('bus').checked)
     {
       currentTransport = data.ResponseData.Buses.length;
     }
    for (let index = 0; index < currentTransport; index++) {
      
      var tr = document.createElement("tr"); 
      var LineNumber = document.createElement("td"); 
      var Destination = document.createElement("td"); 
      var DisplayTime = document.createElement("td"); 
      var Time = document.createElement("td"); 
      const timeh = document.getElementById("time");
      var inputDistance = document.getElementById("distance").value;
    
      let timeSecond = 0;
    
      timeSecond = inputDistance / 1.667

      if(document.getElementById('subway').checked) {
        LineNumber.innerHTML = `${data.ResponseData.Metros[index].LineNumber}`;
        Destination.innerHTML = ` ${data.ResponseData.Metros[index].Destination} `;
        DisplayTime.innerHTML = `${data.ResponseData.Metros[index].DisplayTime}`;
        
       var getnumber =  data.ResponseData.Metros[index].DisplayTime.replace(/[^0-9]/g, "");
      if(inputDistance == 0){
         
      }
       else if(getnumber > 60){
        Time.innerHTML = "Kontrollera avgångstid"
       }
     
        else if(getnumber <= (timeSecond/60))
        {
         Time.innerHTML = "Du hinner inte";
        }
        else{
          Time.innerHTML = "Du hinner";
        }
      }
      else if(document.getElementById('train').checked) {
        LineNumber.innerHTML = `${data.ResponseData.Trains[index].LineNumber}`;
        Destination.innerHTML = ` ${data.ResponseData.Trains[index].Destination} `;
        DisplayTime.innerHTML = `${data.ResponseData.Trains[index].DisplayTime}`;
        var getnumber =  data.ResponseData.Trains[index].DisplayTime.replace(/[^0-9]/g, "");
        if(getnumber > 60){
          Time.innerHTML = "Kontrollera avgångstid"
         }
        else if(getnumber <= (timeSecond/60))
        {
         Time.innerHTML = "Du hinner inte";
        }
        else{
          Time.innerHTML = "Du hinner";
        }
      }
      else if (document.getElementById('bus').checked) {
        LineNumber.innerHTML = `${data.ResponseData.Buses[index].LineNumber}`;
        Destination.innerHTML = ` ${data.ResponseData.Buses[index].Destination} `;
        DisplayTime.innerHTML = `${data.ResponseData.Buses[index].DisplayTime}`;
        var getnumber =  data.ResponseData.Buses[index].DisplayTime.replace(/[^0-9]/g, "");
        if(getnumber > 60){
          Time.innerHTML = "Kontrollera avgångstid"
         }
        else if(getnumber <= (timeSecond/60))
        {
         Time.innerHTML = "Du hinner inte";
        }
        else{
          Time.innerHTML = "Du hinner";
        }
      }
     
      tr.appendChild(LineNumber);
      tr.appendChild(Destination);
      tr.appendChild(DisplayTime);
      tr.appendChild(Time);
      document.getElementById("test").appendChild(tr);
    }
   
 
  })
      .catch(error => {
          if (typeof error.json === "function") {
              error.json().then(jsonError => {
                  console.log("Json error from API");
                  console.log(jsonError);
              }).catch(genericError => {
                  console.log("Generic error from API");
                  console.log(error.statusText);
              });
          } else {
              console.log("Fetch error");
              console.log(error);
          }
      })
};

setInterval(getBusStops,60000);


function whenToLeave(){
  var empty =document.getElementById("time"); 
  empty.innerHTML = "";
  
  var inputDistance = document.getElementById("distance").value;
  
  let timeSecond = 0;
  
  timeSecond = inputDistance / 1.667
  const min = Math.floor(timeSecond / 60); 
    const sec = Math.floor(timeSecond % 60); 
  var timeToGo = document.createElement("p");
  timeSecond = `${min<10 ? '0': ''}${min}:${sec<10?'0':''}${sec}`;
  
  timeToGo.innerHTML= `Det tar dig ${timeSecond} min att gå till hållplatsen`;

  document.getElementById("time").appendChild(timeToGo);


};


