let one = document.getElementById('first')
let two = document.getElementById('second')
let btn = document.getElementById('btn')
let out = document.getElementById('output')
let display = document.getElementById('incorrect')

fetch('https://api.frankfurter.app/currencies')
.then((res) => res.json())
.then((msg) => updateSelect(msg))
.catch((err)=>{
    console.log(err)
})

function updateSelect(msg){
    let ar = Object.entries(msg)
    for(let i=0;i<ar.length;i++)
    {
        let opt = document.createElement('option');
        let opt1 = document.createElement('option');
        opt.value = ar[i][0];
        opt.innerHTML = ar[i][0];
        opt1.value = ar[i][0];
        opt1.innerHTML = ar[i][0];
        one.appendChild(opt);
        two.appendChild(opt1);
    }
}

btn.addEventListener('click',() => {
    let first = one.value;
    let second = two.value
    let given = document.getElementById('userInput').value;
    //console.log(typeof(given));
    if(first === second)
    {
        display.innerHTML = 'Choose different currencies!';
    }
    else
        convert(first,second,Number(given));
})

function convert(curr1,curr2,input)
{
    if(isNaN(input))
    {
        let display = document.getElementById('incorrect');
        display.innerHTML = 'Enter a valid amount!';
    }
    else
    {
    display.innerHTML = "";
    const host = 'api.frankfurter.app';
    fetch(`https://${host}/latest?amount=${input}&from=${curr1}&to=${curr2}`)
    .then(resp => resp.json())
    .then((msg) => {
        let ans = Object.values(msg.rates)[0];
        out.value = ans;
    });
}
}


