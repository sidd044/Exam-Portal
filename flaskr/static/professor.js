const semSelect = (value) => {
let selectedSubject = document.querySelector("#Subject")
selectedSubject.innerHTML = null
        let sem = {
            2:["Programming with C","Programming with Python 2","Linux","Data Structures","Calculus","Statistical Methods and Testing of Hypothesis","Green Technologies"],
            3:["Operating Systems","Web Programming","Core Java","Database Management Systems",
            "Combinatorics and Graph Theory","Linux","Calculus"],
            4:["Software Engineering","Advanced JAVA","Computer Networks","Android Developer Fundamentals","Fundamentals of Algorithms  ",
            "Dot Net Technologies","Linear Algebra using Python "],
            5:["Artificial Intelligence","Linux System Administration","Information and Network Security"," Linux System Administration",
            "Architecting of IoT","Game Programming","Game Programming"],
            6:["Wireless Sensor Networks and Mobile Communication","Cloud Computing ","Digital Image Processing",
            "Data Science","Ethical Hacking","Cyber Forensics","Information Retrieval"]
        }
        sem[value].map((elt) => {
        // Learning thing here is always put "" in value,fuck wasted 1 hour on this stupid bug..
        selectedSubject.innerHTML+=`<option value="${elt}"></option>`})
}

const action = async(examId) =>{
	
    let status = document.querySelector(`#Active_${examId}`)

    const response = await fetch("/status",{
        method : 'POST',
		cache: 'no-cache',
		credentials:'include', 
        headers : {'Content-Type': 'application/json'},
        body:JSON.stringify({examId})
    })
	const result = await response.text()
	
	if(result == "Active"){
		status.innerHTML = "Active"
		
		status.style.backgroundColor = "green"
	}else{
		status.innerHTML = "Deactive"
		status.style.backgroundColor = "red"
	}	
}

const del = async(examId,subject) => {
	
	const response = await fetch("/delete",{
        method : 'POST',
		cache: 'no-cache',
		credentials:'include', 
        headers : {'Content-Type': 'application/json'},
        body:JSON.stringify({examId,subject})
    })
	const result = await response.text()
	if(result == "Deleted"){
		document.querySelector(`#del_${examId}`).remove()
	}
}


const editpaper = async(examId,subject)=>{
    let modal = document.querySelector("#myModal")
    modal.style.display='block'
    document.querySelector(".close").onclick = ()=>{modal.style.display = 'none'}
    const subjectName=document.querySelector("#subjectName").innerHTML = subject
    const response = await fetch("/editPaper",{
        method : 'POST',
		cache: 'no-cache',
		credentials:'include', 
        headers : {'Content-Type': 'application/json'},
        body:JSON.stringify({examId,subject})
    })
	const result = await response.json()
    console.log(result)
    let editTable =  document.querySelector("#editQuestion")
    result.map((elt)=>{
    var row = editTable.insertRow();
    row.style.border = '1px solid #dddddd';
    row.
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.style.padding = '8px';
    
    cell1.innerHTML = `<td >${elt[3]} </td> `
    cell2.innerHTML = `<input type = "file" name = "file" class="file" style=" margin-left: 12px;box-shadow: 0 0 0px; height:10%;width:60%;" required/>
    <button onclick = 'uploadImage(${elt[0]})' style="width:24%;margin-left: 1%;margin-top: 5px;margin-bottom: 5px;right: 1%;margin-right: 0%;">Submit</button>`;
   })
}

const uploadImage = async(id)=>{
    console.log(id)
    let photo = document.querySelector(".file").files[0];
    let formData = new FormData();
    formData.append("photo", photo);
    
    
    const response = await fetch("/uploadImage?id="+id,{
        method : 'POST',
		contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
        processData: false,
        body:formData
    })
    const result = await response.text()
    document.write(result)
}