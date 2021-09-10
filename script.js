console.log("hellow");




let search = document.getElementById("search");
search.addEventListener("click", () => {
    let searchText = document.getElementById("searchJob").value;

    if (searchText) {
        console.log("in search");
        fetchJobs().then((jobs) => {
            console.log(jobs);
            let filterJobs = jobs.filter((job) => {
                console.log(job);
                if (
                    job.roleName
                        .toUpperCase()
                        .includes(searchText.toUpperCase()) ||
                    job.type.toUpperCase().includes(searchText.toUpperCase()) ||
                    job.requirements.intro
                        .toUpperCase()
                        .includes(searchText.toUpperCase())
                ) {
                    return true;
                }
                return false;
            });

            showJobs(filterJobs);

            console.log(filterJobs);
        });
    } else {
        fetchJobs().then((job) => {
            showJobs(job);
        });
    }
});

let showJobs = (jobs) => {
    let jobWrapper = document.getElementById("job_wrapper");
    jobWrapper.innerHTML = "";
    let jobInfo = "";
    jobs.forEach((job) => {
        jobInfo = `
               <div class="card" data-key='${job.id}'>
                    <div class="top flex js-sb ai-c">
                        <img
                            src=" ${job.logo}""
                        />
                        <span>...</span>
                    </div>
                    <h4 class="job_title">${job.roleName}</h4>
                    <p class="job_desc">
                      ${job.requirements.intro}
                    </p>

                    <p class="job_type">${job.type}</p>
                    <div class="button_wrapper flex js-sb ai-c">
                        <button class="apply bg-blue">Apply now</button>
                        <button class="job_type btn-secondary">Message</button>
                    </div>
                </div>
            `;

        jobWrapper.innerHTML += jobInfo;
    });

    myfn();
};

let fetchJobs = () => {
    return fetch("data.json")
        .then((response) => response.json())
        .then((data) => data);
};

function myfn(){
   
let cards = document.querySelectorAll(".card");
console.log(cards);
cards.forEach((card) => {
    card.addEventListener("click", (e) => {
        console.log(card);
        let id = card.getAttribute("data-key");
         showPopUp(id);
    });
});
}

function showPopUp(id){
   let popElem = document.getElementById('pop');
   popElem.innerHTML = '';
   let jobs  = fetchJobs().then (data=> {

      console.log(data[id-1])
      let job = data[id-1];
      console.log(job.roleName)

      let pop = `
         <button id="close">X</button>
                <h1>${job.roleName}</h1>
                <div class="info__container_wrapper">
                    <div class="info flex">
                        <div class="left">
                            <p>Posted Time</p>
                             </div>
                            <div class="right">
                                <p class="time">${job.postedTime}</p>
                            </div>
                       
                    </div>
                    <!-- --------- -->
                    <div class="info flex">
                        <div class="left">
                            <p>Job Type</p>
                             </div>
                            <div class="right">
                                <p class="time">${job.type}</p>
                            </div>
                       
                    </div>
                    <!-- --------- -->
                    <div class="info flex">
                        <div class="left">
                            <p>Website</p>
                            </div>
                            <div class="right">
                                <p class="time">${job.website}</p>
                            </div>
                        
                    </div>
                    <!-- --------- -->
                    <div class="info flex desc_wrapper">
                        <div class="left desc_title">
                            <p>Description</p>
                             </div>
                            <div class="right desc">
                                <p class="time">${job.requirements.intro}</p>
                           
                        </div>
                    </div>
                    <!-- --------- -->
                   
                </div>
                 <button class="apply bg-blue">Apply now</button>
                    <button class="job_type btn-secondary">Message</button>
   `;
    let jobWrapper = document.getElementById("job_wrapper");
    jobWrapper.style.display = 'none';
   popElem.innerHTML = pop;
   popElem.parentElement.style.display = 'block';
   
   let close = document.getElementById('close');
   close.addEventListener('click',()=>{
      popElem.parentElement.style.display = 'none';
       jobWrapper.style.display = "grid";
   })
   })
  
   // let showJob = allJob[id - 1];
   console.log(jobs);
   

}

// console.log(getJobs())
fetchJobs().then(data => showJobs(data));
