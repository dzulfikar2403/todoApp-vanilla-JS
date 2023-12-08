window.addEventListener("load", () => {
  let inputValue = document.getElementById("inputText");
  let removeAll = document.getElementById("removeAll");
  let UlMainList = document.getElementById("main-list");
  let liNew, labelNew, inputNew, divNew, spanEdit, spanRemove;

  window.addEventListener("keyup", (e) => {
    if (e.key === "/" && e.ctrlKey) {
      e.preventDefault(); // untuk mematikan event bawaan dari browser
      inputValue.focus();
    }

    if (e.key === "Enter") {
      mainFunc();
    }
  });

  window.addEventListener("click", (e, i) => {
    if (e.target.id === "singleRemoveClick") e.target.parentElement.parentElement.parentElement.remove();
    if (e.target.id === "editClick") {
      if(e.target.textContent === '✏️'){
        // e.target.parentElement.parentElement.previousElementSibling = inputNew
        e.target.parentElement.parentElement.previousElementSibling.removeAttribute("readonly");
        e.target.parentElement.parentElement.previousElementSibling.focus();
        e.target.textContent = '✔️';
      }else{
        e.target.parentElement.parentElement.previousElementSibling.setAttribute("readonly","readonly");
        e.target.parentElement.parentElement.previousElementSibling.blur();
        e.target.textContent = '✏️';
      }
      setData();
    }

    if (e.target.id === "addValue") mainFunc();

    if (e.target.id === "text") {
      e.target.classList.toggle("checked");
      e.target.previousElementSibling.classList.toggle("activated");
      setData();
    }
  });

  let mainFunc = () => {
    if(!inputValue.value){
      let alertShow = document.getElementById('Alert');
      let confirmAlert = document.getElementById('confirmAlert');
      alertShow.classList.add('alertShow')
      confirmAlert.addEventListener('click',()=>{
        alertShow.classList.remove('alertShow')
      })
    }else{
      liNew = document.createElement("li");
      labelNew = document.createElement("label");
      inputNew = document.createElement("input");
      divNew = document.createElement("div");
      spanEdit = document.createElement("span");
      spanRemove = document.createElement("span");

      inputNew.value = inputValue.value;
      spanEdit.innerHTML = '<p id="editClick">✏️</p>';
      spanRemove.innerHTML = '<i id="singleRemoveClick" class="fa-solid fa-trash" style="color: #ed7707;"></i>';
      spanRemove.setAttribute("id", "singleRemove");
      spanEdit.setAttribute("id", "edit");
      inputNew.setAttribute('id','text');
      inputNew.setAttribute('readonly','readonly');
      liNew.appendChild(labelNew);
      liNew.appendChild(inputNew);

      divNew.appendChild(spanEdit);
      divNew.appendChild(spanRemove);
      liNew.appendChild(divNew);

      UlMainList.append(liNew);
      inputValue.value = "";
      setData();
    }
  };

  removeAll.addEventListener("click", () => {
    UlMainList.innerHTML = "";
    localStorage.removeItem('keyUl');
  });

  //buat cekData ada/tidak
  let getData = localStorage.getItem("keyUl");
  if(!getData){
    console.log('Data tidak ada!')
  }{
    UlMainList.innerHTML = getData;
  }

    // buat localstorage setData for parent LI
    let setData = () => {
      localStorage.setItem("keyUl", UlMainList.innerHTML);
    };
});