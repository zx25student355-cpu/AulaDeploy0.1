"use strict";

const projects = [
  {id:"miromarket",name:"MiroMarket",symbol:"MM",description:"Catálogo de productos con cesta, filtros y área de administración.",technologies:["HTML","CSS","JavaScript"],environment:"Producción",status:"Operativo",version:"v1.4.2",branch:"main",updated:"Hoy, 09:42",url:"market.auladeploy.local",commits:48,tests:"24/24",history:["v1.4.2 · Mejora de filtros · Hoy","v1.4.1 · Corrección de cesta · 12 sep","v1.4.0 · Panel de administración · 4 sep"]},
  {id:"mirotasks",name:"MiroTasks",symbol:"MT",description:"Gestor visual de tareas para organizar entregas y trabajo en equipo.",technologies:["Node.js","Express","SQLite"],environment:"Pruebas",status:"En pruebas",version:"v0.9.0",branch:"release/0.9",updated:"Ayer, 16:18",url:"tasks.test.auladeploy.local",commits:31,tests:"18/20",history:["v0.9.0 · Candidata a versión · Ayer","v0.8.3 · Validación de tareas · 10 sep","v0.8.2 · Filtros de tablero · 2 sep"]},
  {id:"miroevents",name:"MiroEvents",symbol:"ME",description:"Agenda de actividades con inscripción y control de plazas disponibles.",technologies:["PHP","MariaDB","Apache"],environment:"Desarrollo",status:"Pendiente",version:"v0.3.1",branch:"develop",updated:"15 sep, 12:05",url:"events.dev.auladeploy.local",commits:19,tests:"9/12",history:["v0.3.1 · Formulario de inscripción · 15 sep","v0.3.0 · Consulta de eventos · 8 sep","v0.2.0 · Modelo de datos · 1 sep"]},
  {id:"miroapi",name:"MiroAPI",symbol:"API",description:"API REST común para proyectos DAW, con documentación y control de acceso.",technologies:["Java","Spring","OpenAPI"],environment:"Producción",status:"En mantenimiento",version:"v2.1.0",branch:"main",updated:"13 sep, 18:30",url:"api.auladeploy.local",commits:67,tests:"41/41",history:["v2.1.0 · Nuevos endpoints · 13 sep","v2.0.2 · Revisión de seguridad · 7 sep","v2.0.1 · Ajuste de respuestas · 29 ago"]}
];

const statusClass = {"Operativo":"status-operativo","En pruebas":"status-pruebas","Pendiente":"status-pendiente","En mantenimiento":"status-mantenimiento","Con incidencias":"status-incidencias"};
const escapeHtml = value => String(value).replace(/[&<>'"]/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[char]));

function statusChip(status){return `<span class="status-chip ${statusClass[status]||"status-pendiente"}">${escapeHtml(status)}</span>`}

function renderStats(){
  const stats=[{icon:"◇",value:projects.length,label:"Proyectos activos"},{icon:"✓",value:projects.filter(p=>p.status==="Operativo").length,label:"En producción"},{icon:"↗",value:"12",label:"Despliegues este mes"},{icon:"⌁",value:"3",label:"Entornos disponibles"}];
  document.querySelector("#statsGrid").innerHTML=stats.map(s=>`<article class="stat-card"><span class="stat-icon" aria-hidden="true">${s.icon}</span><div><strong>${s.value}</strong><small>${s.label}</small></div></article>`).join("");
}

function renderRecent(){
  document.querySelector("#recentDeployments").innerHTML=projects.map(p=>`<article class="deployment-row"><span class="project-symbol">${p.symbol}</span><div><strong>${p.name}</strong><small>${p.version} · ${p.branch}</small></div><div><strong>${p.environment}</strong><small>${p.updated}</small></div>${statusChip(p.status)}</article>`).join("");
  const environments=[{name:"Producción",count:2,width:100},{name:"Pruebas",count:1,width:68},{name:"Desarrollo",count:1,width:48}];
  document.querySelector("#environmentStatus").innerHTML=environments.map(e=>`<div class="environment-row"><div><strong>${e.name}</strong><small>${e.count} proyecto${e.count!==1?"s":""}</small></div><div class="bar"><span style="width:${e.width}%"></span></div></div>`).join("");
}

function projectCard(p){return `<article class="project-card"><div class="project-accent"></div><div class="project-body"><div class="project-top"><div class="project-title"><span class="project-symbol">${p.symbol}</span><div><h2>${p.name}</h2><p>${p.url}</p></div></div>${statusChip(p.status)}</div><p class="project-description">${p.description}</p><div class="tech-list">${p.technologies.map(t=>`<span class="tech-tag">${t}</span>`).join("")}</div><div class="project-meta"><div><small>Entorno</small><strong>${p.environment}</strong></div><div><small>Versión</small><strong>${p.version}</strong></div><div><small>Rama</small><strong>${p.branch}</strong></div></div></div><div class="project-footer"><small>Actualizado ${p.updated.toLowerCase()}</small><button class="details-button" type="button" data-project="${p.id}">Ver detalle →</button></div></article>`}

function renderProjects(){
  const search=document.querySelector("#projectSearch").value.trim().toLowerCase();
  const environment=document.querySelector("#environmentFilter").value;
  const status=document.querySelector("#statusFilter").value;
  const filtered=projects.filter(p=>(!search||`${p.name} ${p.description} ${p.technologies.join(" ")}`.toLowerCase().includes(search))&&(environment==="todos"||p.environment===environment)&&(status==="todos"||p.status===status));
  document.querySelector("#projectsGrid").innerHTML=filtered.map(projectCard).join("");
  document.querySelector("#emptyState").hidden=filtered.length!==0;
}

function openProject(id){
  const p=projects.find(item=>item.id===id); if(!p)return;
  document.querySelector("#modalContent").innerHTML=`<div class="modal-header"><span class="project-symbol">${p.symbol}</span><div><h2 id="modalTitle">${p.name}</h2><p>${p.description}</p></div></div>${statusChip(p.status)}<div class="modal-grid"><div class="modal-metric"><small>Entorno</small><strong>${p.environment}</strong></div><div class="modal-metric"><small>Commits</small><strong>${p.commits}</strong></div><div class="modal-metric"><small>Pruebas</small><strong>${p.tests}</strong></div></div><h3>Historial reciente</h3><div class="modal-timeline">${p.history.map(item=>`<p>${item}</p>`).join("")}</div><a class="button primary" href="#solicitud" data-deploy-project="${p.name}">Desplegar este proyecto →</a>`;
  const modal=document.querySelector("#projectModal"); modal.hidden=false; document.body.style.overflow="hidden"; modal.querySelector(".modal-close").focus();
}
function closeModal(){document.querySelector("#projectModal").hidden=true;document.body.style.overflow=""}

function route(){
  const target=["inicio","proyectos","solicitud"].includes(location.hash.slice(1))?location.hash.slice(1):"inicio";
  document.querySelectorAll(".view").forEach(v=>v.classList.toggle("active",v.id===target));
  document.querySelectorAll(".nav-link").forEach(l=>l.classList.toggle("active",l.dataset.route===target));
  document.querySelector("#sidebar").classList.remove("open");document.querySelector("#menuButton").setAttribute("aria-expanded","false");
  window.scrollTo({top:0,behavior:"smooth"});
}

function configureForm(){
  const select=document.querySelector("#projectField");
  select.insertAdjacentHTML("beforeend",projects.map(p=>`<option>${p.name}</option>`).join(""));
  const form=document.querySelector("#deploymentForm");
  form.addEventListener("submit",event=>{
    event.preventDefault();
    form.querySelectorAll("input,select,textarea").forEach(field=>field.closest("label")?.classList.toggle("invalid",!field.checkValidity()));
    if(!form.checkValidity())return;
    document.querySelector("#toast").hidden=false;form.reset();form.querySelector('[name="branch"]').value="main";
    setTimeout(()=>document.querySelector("#toast").hidden=true,4200);
  });
  form.addEventListener("input",event=>event.target.closest("label")?.classList.remove("invalid"));
}

function updateClock(){document.querySelector("#clock").textContent=new Intl.DateTimeFormat("es-ES",{weekday:"short",day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"}).format(new Date())}

document.addEventListener("DOMContentLoaded",()=>{
  renderStats();renderRecent();renderProjects();configureForm();route();updateClock();setInterval(updateClock,60000);
  addEventListener("hashchange",route);
  ["projectSearch","environmentFilter","statusFilter"].forEach(id=>document.querySelector(`#${id}`).addEventListener("input",renderProjects));
  document.addEventListener("click",event=>{
    const detail=event.target.closest("[data-project]");if(detail)openProject(detail.dataset.project);
    if(event.target.closest("[data-close-modal]"))closeModal();
    const deploy=event.target.closest("[data-deploy-project]");if(deploy){closeModal();setTimeout(()=>{document.querySelector("#projectField").value=deploy.dataset.deployProject},0)}
  });
  document.addEventListener("keydown",event=>{if(event.key==="Escape"&&!document.querySelector("#projectModal").hidden)closeModal()});
  document.querySelector("#menuButton").addEventListener("click",event=>{const open=document.querySelector("#sidebar").classList.toggle("open");event.currentTarget.setAttribute("aria-expanded",String(open))});
  document.querySelector("#themeButton").addEventListener("click",()=>document.body.classList.toggle("light-panel"));
});
