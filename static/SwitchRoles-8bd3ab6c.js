import{b as a}from"./user-58839eb1.js";import{x as e,as as s,aZ as l,aw as o,ak as r,m as t,n,aK as u,aS as i,u as d,b2 as m,ao as c,al as p}from"./runtime-core.esm-bundler-1857aef3.js";import{_ as v}from"./_plugin-vue_export-helper-1b428a4d.js";const _={class:"switch-roles"},b=(a=>(c("data-v-21f43ea2"),a=a(),p(),a))((()=>n("span",null,"切换权限：",-1))),f=v(e({__name:"SwitchRoles",emits:["change"],setup(e,{emit:c}){const p=a(),v=s(p.roles[0]);return l(v,(async a=>{await p.changeRoles(a),c("change")})),(a,e)=>{const s=o("el-radio-button"),l=o("el-radio-group");return r(),t("div",null,[n("div",null,"你的权限："+u(i(p).roles),1),n("div",_,[b,d(l,{modelValue:v.value,"onUpdate:modelValue":e[0]||(e[0]=a=>v.value=a)},{default:m((()=>[d(s,{label:"editor"}),d(s,{label:"admin"})])),_:1},8,["modelValue"])])])}}}),[["__scopeId","data-v-21f43ea2"]]);export{f as S};