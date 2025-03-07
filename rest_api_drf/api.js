let headersList = {
    "Accept": "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json"
   }
   
   let bodyContent = JSON.stringify(
   {
     "gridSize": 30,
     "moisture":40,
     "step":30,
     "windDirection": "W",
     "windStregth": 1,
     "airTempeture": 45
   });
   
   let response = await fetch("http://127.0.0.1:8000/fire/", { 
     method: "POST",
     body: bodyContent,
     headers: headersList
   });
   
   let data = await response.json();
   console.log(data);
   