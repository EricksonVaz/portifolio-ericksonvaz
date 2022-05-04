var languageObj = {
    pt: ptValuesTranslate,
    en: enValuesTranslate,
}
function translate(valueString){
    let currentLanguage = getCurrentLanguage();
    return languageObj[currentLanguage.toLowerCase()][valueString.trim()]??valueString.trim();
}

function getCurrentLanguage(){
    return localStorage.getItem("language") ?? document.documentElement.lang.split("-")[0];
}

function runTranslate(){
    let itemsToTranalate = document.querySelectorAll(".translate");
    let placeholderToTranslate = document.querySelectorAll(".translate-placeholder");
    let readmeMyCV = document.querySelectorAll(".readme");

    readmeMyCV.forEach(readme=>{
        if(readme.classList.contains(getCurrentLanguage())){
            readme.classList.remove("d-none");
        }else{
            readme.classList.add("d-none");
        }
    });

    placeholderToTranslate.forEach(input=>{
        let valuePlaceHolder = input.dataset.oriTrans;
        input.placeholder = translate(valuePlaceHolder);
    })

    itemsToTranalate.forEach(elTranslate=>{
        let valueString = elTranslate.dataset.oriTrans;
        elTranslate.innerText = translate(valueString);
    });
}

document.querySelectorAll(`[data-lang]`).forEach(btnLang=>{
    btnLang.addEventListener("click",function(e){
        e.stopPropagation();
        let lang = btnLang.dataset.lang?.trim() ?? "pt";
        localStorage.setItem("language",lang);
        
        runTranslate();
    });
});

(function(){
    if(getCurrentLanguage()=="en") document.documentElement.lang = "en-US";
    else document.documentElement.lang = "pt-PT";

     runTranslate();
})();