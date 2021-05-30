const api =
  "https://dev.onebanc.ai/assignment.asmx/GetTransactionHistory?userId=1&&recipientId=2";
async function getapi(url) {
  const response = await fetch(url);

  var data = await response.json();
  var MainData = data.transactions;
  const sortedData = MainData.slice().sort((a, b) => a.id - b.id);
  console.log(sortedData);
  const dates = sortedData.map((res) => res.startDate.slice(0, 10));
  const FilterDate = [...new Set(dates)];
  document.getElementById("navbar").innerHTML = `
    <p>Transaction History<p/>
    <p><small>${sortedData[0].partner.vPay}</small></p>
    
    `;
  const html = FilterDate.map((date) => {
    return `

     
     <div class="main" id="modal" >
     <p class="main__date">${date}</p>
     ${sortedData
       .map((res) => {
         if (res.startDate.slice(0, 10) === date) {
           return `
        
               
            <div class="mainHead">
            <div class="card" id=${
              res.direction === 1 ? "sent" : "received"
            } style="width: 22rem; ">
            <div class=${
              res.status === 1
                ? "boxpending"
                : res.status === 2
                ? "boxconfirmed"
                : "boxexipre"
            }>
<div class="card-body">
<div class="d-flex justify-content-between">
<h5 class="card-title">Rs ${res.amount}</h5>

<p >${
             res.type === 1 && res.status === 2 && res.direction === 1
               ? "You Paid"
               : res.type === 2 && res.status === 1 && res.direction === 1
               ? "You requested"
               : res.type === 1 && res.status === 2 && res.direction === 2
               ? "You received"
               : res.type === 2 && res.status === 1 && res.direction === 2
               ? "Request received"
               : ""
           }</p>

</div>
<div>
${
  res.type === 1 && res.status === 2 && res.direction === 1
    ? transactionId(res)
    : res.type === 2 && res.status === 1 && res.direction === 1
    ? TrascationButton(res)
    : res.type === 1 && res.status === 2 && res.direction === 2
    ? transactionId(res)
    : res.type === 2 && res.status === 1 && res.direction === 2
    ? TrascationButtons(res)
    : ""
}

</div>
</div>
</div>
            </div>
            </div>
 `;
         }
       })
       .join(" ")}
     </div>
    
      `;
  }).join(" ");
  document.getElementById("app").insertAdjacentHTML("afterbegin", html);
}
getapi(api);
function transactionId(res) {
  return `
    <div class='d-flex'>
    <div>
    <p class="transactiondetails"><small>Transaction Id</small></p>
    <p class="transactiondetails">Abc${res.id}</p>
    </div>
    <p class="ml-auto"><small>${res.startDate.slice(11, 19)}</small></p>

    </div>
    `;
}
function TrascationButton(res) {
  return `
    <div class='d-flex'>
    <div>
    <button class="btn btn-primary">cancel</button>

    </div>
    <p class="ml-auto"><small>${res.startDate.slice(11, 19)}</small></p>

    </div>
    

    `;
}
function TrascationButtons(res) {
  return `
    

    <div class='d-flex'>
    <div>
    <button class="btn btn-primary px-4">Pay</button>
    <button class="btn btn-primary">Decline</button>
    </div>
    <p class="ml-auto"><small>${res.startDate.slice(11, 19)}</small></p>

    </div>

    `;
}
