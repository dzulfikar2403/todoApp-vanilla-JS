window.addEventListener("DOMContentLoaded", () => {
  let inputValue = document.getElementById("inputText");
  let removeAll = document.getElementById("removeAll");
  let UlMainList = document.getElementById("main-list");
  let liNew, pLogo, spanText, divNew, spanEdit, spanRemove;

  //set window event keyup
  window.addEventListener("keyup", (e) => {
    //set shorthand
    if (e.key === "/" && e.ctrlKey) {
      e.preventDefault(); // untuk mematikan event bawaan dari browser
      inputValue.focus();
    }

    if (e.key === "Enter") {
      mainFunc();
    }
  });


  //set window event click
  window.addEventListener("click", (e, i) => {
    //remove per 1 item 
    if (e.target.id === "singleRemoveClick") {
      e.target.parentElement.parentElement.parentElement.remove();// remove w event penulusran
      setData(); //set localStorage
    }

    //edit per 1 item
    if (e.target.id === "editClick") {
      let newVal = e.target.parentElement.parentElement.previousElementSibling;
      let ChangeValue = document.getElementById("ChangeValue");
      let cancelChange = document.getElementById("cancelChange");
      let confirmChange = document.getElementById("confirmChange");
      let ChangeSpanText = document.getElementById("ChangeSpanText");

      //changeEdit active
      ChangeSpanText.classList.add('editShow');
      ChangeValue.focus();

      // cancel data if click cancel
      cancelChange.addEventListener('click',()=>{
        ChangeSpanText.classList.remove('editShow');
        ChangeValue.blur();
        setData(); //set localStorage
      });
      
      // confirm data if click cancel
      confirmChange.addEventListener('click',()=>{
        ChangeSpanText.classList.remove('editShow');
        ChangeValue.blur();
        
        //ambil nilai dulu, baru hapus isi input dari changeValue
        newVal.textContent = ChangeValue.value;
        ChangeValue.value = '';

        setData(); //set localStorage
      });
    }

    //if btn Enter diclick. jlnkn func
    if (e.target.id === "addValue") mainFunc();

    // set active jika task sudah selesai (tag = LI)
    if (e.target.tagName === "LI") {
      // take p dari LI & set success
      e.target.children[0].classList.toggle("activated");
      e.target.children[1].classList.toggle("checked");
      
      setData(); //set localStorage
    }
    
    
    // set active jika task sudah selesai (id = text)
    if (e.target.id === "text") {
      // take p dari id text & set success
      e.target.previousElementSibling.classList.toggle("activated");
      e.target.classList.toggle("checked");
    
      setData(); //set localStorage
    }
  });

  //bikin func utama
  let mainFunc = () => {
    if (!inputValue.value) {
      let alertShow = document.getElementById("Alert");
      let confirmAlert = document.getElementById("confirmAlert");
      alertShow.classList.add("alertShow");
      confirmAlert.addEventListener("click", () => {
        alertShow.classList.remove("alertShow");
      });
    } else {
      liNew = document.createElement("li");
      pLogo = document.createElement("p");
      spanText = document.createElement("span");
      divNew = document.createElement("div");
      spanEdit = document.createElement("span");
      spanRemove = document.createElement("span");

      spanText.textContent = inputValue.value;
      // pLogo.setAttribute('for','text');
      spanEdit.innerHTML = '<span id="editClick">✏️</span>';
      spanRemove.innerHTML = '<i id="singleRemoveClick" class="fa-solid fa-trash" style="color: #ed7707;"></i>';
      spanRemove.setAttribute("id", "singleRemove");
      spanEdit.setAttribute("id", "edit");
      spanText.setAttribute("id", "text");
      liNew.appendChild(pLogo);
      liNew.appendChild(spanText);

      divNew.appendChild(spanEdit);
      divNew.appendChild(spanRemove);
      liNew.appendChild(divNew);

      UlMainList.append(liNew);
      inputValue.value = "";
      setData();
    }
  };

  // hapus semua isi UL dengan keyUl dari localstorage
  removeAll.addEventListener("click", () => {
    UlMainList.innerHTML = "";
    localStorage.removeItem('keyUl');
  });

  //buat cekData ada/tidak
  let getData = localStorage.getItem("keyUl");
  // buat localstorage setData for parent LI
  let setData = () => {
    localStorage.setItem("keyUl", UlMainList.innerHTML);
  };

  // set UL jika sudah memiliki data dari localStorage 
  UlMainList.innerHTML = getData;
});
