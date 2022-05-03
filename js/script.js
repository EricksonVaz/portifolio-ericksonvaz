window.addEventListener("load",function(){
    const burgerIcon = document.querySelector(".burger-menu-icon");
    const navigationMenu = document.querySelector(".main-navigation");
    const listCertificatesContainer = document.querySelector(".list-certificates");
    const allCertificatesCards = document.querySelectorAll(".certificate-card");
    const backdropModal = document.querySelector(".backdrop-modal");
    const modalShowCertificate = document.querySelector(".modal-show-certificate");
    const modalTitleCertificate = modalShowCertificate.querySelector(".modal-title");
    const imgModalShowCertificate = modalShowCertificate.querySelector(".img-certificate");
    const modalLinkVerifiCert = modalShowCertificate.querySelector(".open-cert-link");
    const modalBtnNextCert = modalShowCertificate.querySelector(".control-next");
    const modalBtnPrevCert = modalShowCertificate.querySelector(".control-prev");
    const btnCloseModal = document.querySelectorAll(".modal .close");

    const sectionProjects = document.querySelector("#projects");
    const btnsProjectsTabs = sectionProjects.querySelectorAll(".btn-cat-project");
    const listProjectContainer = sectionProjects.querySelector(".list-projects");
    const selectDropdown = sectionProjects.querySelector(".stack-selection");

    const btnsReadmeProject = document.querySelectorAll("[data-readme-link]");
    const modalReadmeProject = document.querySelector(".modal-readme-project");
    const modalTitleReadme = modalReadmeProject.querySelector(".modal-project-title");
    const modalBodyReadmeProject = modalReadmeProject.querySelector(".modal-body");

    const modalUnderConstruction = document.querySelector(".modal-under-construction");
    const linksOpenModalUnderConstruction = document.querySelectorAll(".under-construction");
    const formContact = document.querySelector(".form-contact");

    let certificates = [...allCertificatesCards];
    let indexCertificateClicked = -1;

    certificates = certificates.map(function(certificateCardEl){
        let companyName = certificateCardEl.querySelector(".label-company-cert").innerText;
        let certificateName = certificateCardEl.querySelector(".label-certificate").innerText;
        let titleCertificate = `${companyName} - ${certificateName}`;
        return [certificateCardEl.dataset.imgModal,certificateCardEl.dataset.certLink,titleCertificate];
    });

    burgerIcon.addEventListener("click",function(){
        burgerIcon.classList.toggle("open");
        navigationMenu.classList.toggle("open");
    });

    listCertificatesContainer.addEventListener("click",function(event){
        const target = event.target;
        if(target.classList.contains("cert-open-model")){
            let imgModal = target.parentElement.dataset.imgModal;

            indexCertificateClicked = certificates.findIndex(function(element){
                return element[0] === imgModal;
            });

            backdropModal.classList.add("open");
            modalShowCertificate.classList.add("open");
           
            if(indexCertificateClicked !== -1){
                loadCertModal(indexCertificateClicked);

            }
        }
    });

    btnCloseModal.forEach(el=>{
        el.addEventListener("click",function(){
            backdropModal.classList.remove("open");
            el.closest(".modal").classList.remove("open");
        });
    });

    modalBtnNextCert.addEventListener("click",function(){
        if(!modalBtnNextCert.classList.contains("not-allowed")){
            if(indexCertificateClicked>=0 && indexCertificateClicked<certificates.length-1){
                indexCertificateClicked++;
            }

            loadCertModal(indexCertificateClicked);
        }
    });

    modalBtnPrevCert.addEventListener("click",function(){
        if(!modalBtnPrevCert.classList.contains("not-allowed")){
            if(indexCertificateClicked<=certificates.length-1){
                indexCertificateClicked--;
            }

            loadCertModal(indexCertificateClicked);
        }
    });

    btnsReadmeProject.forEach(el=>{
        el.addEventListener("click",function(){
            let assetsReadmeFile = el.dataset.readmeLink;

            let projectTitle = el.closest(".card-project").querySelector(".project-name").innerText;
            modalTitleReadme.innerText = projectTitle;
            backdropModal.classList.add("open");
            modalReadmeProject.classList.add("open");

            fetch(assetsReadmeFile)
            .then(resp=>resp.text())
            .then(text=>{
                modalBodyReadmeProject.innerHTML = `<p>${text}</p>`;
            });
        })
    });

    btnsProjectsTabs.forEach(el=>{
        el.addEventListener("click",function(){
            if(!el.classList.contains("selected")){
                let parentContainer = el.parentElement;
                let tabClassToShow = el.dataset.tab;
                let tabToShow = listProjectContainer.querySelector(`.${tabClassToShow}`);
                let tabToHide = listProjectContainer.querySelector(".show");
                let listCardsVisible = listProjectContainer.querySelectorAll(".tab-projects.show > .card-project");

                parentContainer.querySelector(".selected").classList.remove("selected");
                el.classList.add("selected");
                tabToHide.classList.remove("show");
                tabToHide.classList.add("hide");
                tabToShow.classList.remove("hide");
                tabToShow.classList.add("show");

                listCardsVisible.forEach(el=>{
                    el.classList.remove("d-none");
                });
            }
        });
    });

    linksOpenModalUnderConstruction.forEach(el=>{
        el.addEventListener("click",function(e){
            e.preventDefault();
            backdropModal.classList.add("open");
            modalUnderConstruction.classList.add("open");
        });
    })

    selectDropdown.addEventListener("change",function(){
        let stackSelected = selectDropdown.value;
        let listCardsVisible = listProjectContainer.querySelectorAll(".tab-projects.show > .card-project");

        if(stackSelected=="all"){
            listCardsVisible.forEach(el=>{
                el.classList.remove("d-none");
            });
        }else{
            listCardsVisible.forEach(el=>{
                let indexSubstring = el.dataset.stack.indexOf(stackSelected);

                if(indexSubstring!=-1){
                    el.classList.remove("d-none")
                }else{
                    el.classList.add("d-none")
                }
                
            });
        }
    });

    formContact.addEventListener("submit",function(e){
        e.preventDefault();
        //console.log(formContact.checkValidity)
        let inputEmail = formContact.querySelector(`[name="email"]`).value;
        let inputName = formContact.querySelector(`[name="name"]`).value;
        let inputSubject = formContact.querySelector(`[name="subject"]`).value;
        let inputBody = formContact.querySelector(`[name="body"]`).value;

        if(inputEmail.length && inputName.length && inputSubject.length && inputBody.length){
             Email.send({
                SecureToken : "9a902b5a-b3af-4070-ac75-3d5d612020eb",
                To : 'ericksoncv1@outlook.com',
                From : inputEmail,
                Subject : "Portifolio - "+inputSubject,
                Body : `
                    Nome: ${inputName}
                    Email: ${inputEmail}

                    TXT: ${inputBody}

                `
            }).then(
                message =>swal(message)
            );
        }else{
            swal({
                title: "Oops!",
                text: "todos os campos são obrigatorios",
                icon: "error",
            });
        }
    });

    function loadCertModal(indexCertificate){
        let [certImg,certLink,certTitle] = certificates[indexCertificate];
        modalTitleCertificate.innerHTML = certTitle;
        imgModalShowCertificate.src = certImg;

        console.log(certLink);
        if(certLink){
            modalLinkVerifiCert.href = certLink;
            modalLinkVerifiCert.classList.remove("not-allowed");
        }else{
            modalLinkVerifiCert.href = "#";
            modalLinkVerifiCert.classList.add("not-allowed");
        }

        if(indexCertificate<=0){
            modalBtnNextCert.classList.remove("not-allowed");
            modalBtnPrevCert.classList.add("not-allowed");
        }else if(indexCertificate>0 && indexCertificate<certificates.length-1){
            modalBtnNextCert.classList.remove("not-allowed");
            modalBtnPrevCert.classList.remove("not-allowed");
        }else{
            modalBtnPrevCert.classList.remove("not-allowed");
            modalBtnNextCert.classList.add("not-allowed");
        }
    }

});