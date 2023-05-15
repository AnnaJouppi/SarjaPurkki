let newShowname = document.getElementById("showname")

const data = { 'showname': newShowname.value }
const options = {
    method: 'POST',
    headers:
    {
        'Content-Type' :'application/json'
    },
    body: JSON.stringify(data)
};
fetch('http://localhost:3000/sarjapurkki', options)