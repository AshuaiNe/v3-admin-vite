import{b as a,D as e,a as s,w as l,f as o,o as t,h as n,z as d,t as i,m as r,i as u,j as c,H as m,I as p,_ as v}from"./index-395ef5a7.js";const h={class:"switch-roles"},_=(a=>(m("data-v-54e6a169"),a=a(),p(),a))((()=>d("span",null,"切换权限：",-1))),b=v(a({__name:"SwitchRoles",emits:["change"],setup(a,{emit:m}){const p=e(),v=s(p.roles[0]);return l(v,(async a=>{await p.changeRoles(a),m("change")})),(a,e)=>{const s=o("el-radio-button"),l=o("el-radio-group");return t(),n("div",null,[d("div",null,"你的权限："+i(r(p).roles),1),d("div",h,[_,u(l,{modelValue:v.value,"onUpdate:modelValue":e[0]||(e[0]=a=>v.value=a)},{default:c((()=>[u(s,{label:"editor"}),u(s,{label:"admin"})])),_:1},8,["modelValue"])])])}}}),[["__scopeId","data-v-54e6a169"]]);export{b as S};