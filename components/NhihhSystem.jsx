"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard, Link2, Users, CircleDollarSign, FileEdit, ShoppingBag,
  Settings, Search, Plus, Upload, Download, Copy, Check, X, Pencil,
  KeyRound, Ban, CheckCircle2, Trophy, PauseCircle, PlayCircle, Save,
  RotateCcw, Menu, TrendingUp, AlertTriangle, ExternalLink
} from "lucide-react";
import { storageGet, storageSet } from "./storage";

/* ----------------------------- design tokens ---------------------------- */
const STYLE = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

.nhihh-root{
  --ink:#1B3A2B;
  --ink-light:#2E4F3B;
  --paper:#FAF7EE;
  --paper-alt:#F1EBDB;
  --paper-line:#E3DBC4;
  --gold:#C79A2E;
  --gold-soft:#EFDBA6;
  --coral:#C1443C;
  --sage:#5C8262;
  --text-dark:#20291F;
  --text-muted:#6E6C5E;
  font-family:'IBM Plex Sans',sans-serif;
  background:var(--paper);
  color:var(--text-dark);
  min-height:100vh;
  position:relative;
}
.nhihh-root *{box-sizing:border-box;}
.nhihh-root .mono{font-family:'IBM Plex Mono',monospace; font-variant-numeric:tabular-nums;}
.nhihh-root .display{font-family:'Fraunces',serif;}
.nhihh-admin-shell{display:flex;}

/* sidebar */
.nhihh-sidebar{
  width:220px; flex-shrink:0; background:var(--ink); color:#EDE7D6;
  display:flex; flex-direction:column; padding:22px 14px; min-height:100vh;
  position:sticky; top:0; align-self:flex-start;
}
.nhihh-logo{display:flex; align-items:center; gap:9px; padding:0 8px 22px 8px; border-bottom:1px solid rgba(237,231,214,0.14); margin-bottom:16px;}
.nhihh-logo .mark{width:30px; height:30px; border-radius:7px; background:var(--gold); color:var(--ink); display:flex; align-items:center; justify-content:center; font-weight:700; font-family:'Fraunces',serif; font-size:16px;}
.nhihh-logo .name{font-family:'Fraunces',serif; font-weight:600; font-size:16.5px; letter-spacing:0.2px;}
.nhihh-logo .sub{font-size:10px; color:#B9C2AE; letter-spacing:0.6px; text-transform:uppercase;}
.nhihh-nav{display:flex; flex-direction:column; gap:2px; flex:1;}
.nhihh-nav-item{
  display:flex; align-items:center; gap:10px; padding:10px 12px; border-radius:8px;
  color:#D9D3BF; font-size:13.5px; cursor:pointer; border:none; background:transparent;
  text-align:left; width:100%; border-left:3px solid transparent; transition:background .15s, color .15s;
}
.nhihh-nav-item:hover{background:rgba(237,231,214,0.08); color:#F4EFE0;}
.nhihh-nav-item.active{background:rgba(199,154,46,0.16); color:#FBEFCF; border-left:3px solid var(--gold); font-weight:500;}
.nhihh-nav-item svg{flex-shrink:0;}
.nhihh-sidebar-actions{display:flex; flex-direction:column; gap:6px; padding:10px 2px; border-top:1px solid rgba(237,231,214,0.14); margin-top:10px;}
.nhihh-sidebar-actions button{justify-content:flex-start; width:100%; color:#D9D3BF; border-color:rgba(237,231,214,0.24);}
.nhihh-sidebar-actions button:hover{background:rgba(237,231,214,0.08);}
.nhihh-sidebar-footer{font-size:10.5px; color:#8B9382; padding:14px 10px 0 10px; border-top:1px solid rgba(237,231,214,0.14); margin-top:10px;}

/* mobile nav */
.nhihh-mobile-bar{display:none;}

/* main */
.nhihh-main{flex:1; min-width:0; display:flex; flex-direction:column;}
.nhihh-topbar{
  display:flex; align-items:center; justify-content:space-between;
  padding:20px 30px; border-bottom:1px solid var(--paper-line); background:var(--paper);
  position:sticky; top:0; z-index:5;
}
.nhihh-topbar h1{font-family:'Fraunces',serif; font-size:22px; font-weight:600; margin:0; display:flex; align-items:center; gap:9px;}
.nhihh-topbar .date{font-size:12.5px; color:var(--text-muted); font-family:'IBM Plex Mono',monospace;}
.nhihh-content{padding:26px 30px 60px 30px; flex:1;}

.nhihh-banner{display:flex; align-items:center; gap:10px; background:#F7E3D8; border:1px solid #E7B79B; color:#8C3A22; padding:10px 16px; border-radius:8px; font-size:13px; margin-bottom:18px;}

/* stat cards */
.nhihh-stats-row{display:grid; grid-template-columns:repeat(4,1fr); gap:16px; margin-bottom:24px;}
.nhihh-stat-card{background:var(--paper-alt); border:1px solid var(--paper-line); border-radius:12px; padding:18px 20px;}
.nhihh-stat-card .label{font-size:12px; color:var(--text-muted); margin-bottom:8px; display:flex; align-items:center; gap:6px;}
.nhihh-stat-card .value{font-family:'Fraunces',serif; font-size:28px; font-weight:600; color:var(--ink);}
.nhihh-stat-card .value.gold{color:#9C7A1E;}
.nhihh-stat-card .value.coral{color:var(--coral);}

/* leaderboard ticket */
.nhihh-ticket{background:var(--paper-alt); border:1px solid var(--paper-line); border-radius:12px 12px 0 0; padding:20px 22px 26px 22px; position:relative;}
.nhihh-ticket h3{font-family:'Fraunces',serif; font-size:16px; margin:0 0 14px 0; display:flex; align-items:center; gap:8px; color:var(--ink);}
.nhihh-ticket-tear{height:11px; background-image:linear-gradient(135deg, transparent 50%, var(--paper) 50%), linear-gradient(45deg, var(--paper) 50%, transparent 50%); background-size:16px 16px; background-position:top; margin-bottom:22px; border-left:1px solid var(--paper-line); border-right:1px solid var(--paper-line);}
.nhihh-lb-row{display:flex; align-items:baseline; padding:7px 0; font-size:13.5px;}
.nhihh-lb-row .rank{width:20px; color:var(--gold); font-weight:700; font-family:'Fraunces',serif;}
.nhihh-lb-row .name{white-space:nowrap;}
.nhihh-lb-row .dots{flex:1; border-bottom:2px dotted #B9AF92; margin:0 8px; transform:translateY(-4px);}
.nhihh-lb-row .stats{white-space:nowrap; font-family:'IBM Plex Mono',monospace; color:var(--text-muted); font-size:12.5px;}
.nhihh-lb-row .stats b{color:var(--sage);}

/* chart card */
.nhihh-card{background:var(--paper-alt); border:1px solid var(--paper-line); border-radius:12px; padding:20px 22px;}
.nhihh-card h3{font-family:'Fraunces',serif; font-size:16px; margin:0 0 14px 0; color:var(--ink);}
.nhihh-grid-2{display:grid; grid-template-columns:1.4fr 1fr; gap:18px; align-items:start;}

/* toolbar */
.nhihh-toolbar{display:flex; align-items:center; gap:10px; margin-bottom:16px; flex-wrap:wrap;}
.nhihh-search{display:flex; align-items:center; gap:8px; background:var(--paper); border:1px solid var(--paper-line); border-radius:8px; padding:8px 12px; flex:1; min-width:180px;}
.nhihh-search input{border:none; outline:none; background:transparent; font-size:13px; width:100%; color:var(--text-dark);}
.nhihh-tab{padding:7px 13px; border-radius:7px; font-size:12.5px; border:1px solid var(--paper-line); background:var(--paper); color:var(--text-muted); cursor:pointer;}
.nhihh-tab.active{background:var(--ink); color:#F4EFE0; border-color:var(--ink);}

/* buttons */
.nhihh-btn{display:inline-flex; align-items:center; gap:7px; padding:9px 15px; border-radius:8px; font-size:13px; font-weight:500; cursor:pointer; border:1px solid transparent; transition:filter .12s, transform .05s; text-decoration:none;}
.nhihh-btn:active{transform:scale(0.98);}
.nhihh-btn:disabled{opacity:0.5; cursor:not-allowed;}
.nhihh-btn-primary{background:var(--ink); color:#F4EFE0;}
.nhihh-btn-primary:hover{filter:brightness(1.15);}
.nhihh-btn-gold{background:var(--gold); color:#2A2000;}
.nhihh-btn-gold:hover{filter:brightness(1.08);}
.nhihh-btn-ghost{background:transparent; color:var(--text-dark); border-color:var(--paper-line);}
.nhihh-btn-ghost:hover{background:var(--paper-alt);}
.nhihh-btn-danger{background:transparent; color:var(--coral); border-color:#E3B6AE;}
.nhihh-btn-danger:hover{background:#FBEAE6;}
.nhihh-btn-sm{padding:6px 11px; font-size:12px;}

/* table */
.nhihh-table-wrap{background:var(--paper-alt); border:1px solid var(--paper-line); border-radius:12px; overflow:hidden; overflow-x:auto;}
table.nhihh-table{width:100%; border-collapse:collapse; font-size:13px;}
table.nhihh-table thead th{text-align:left; padding:12px 16px; font-size:11px; text-transform:uppercase; letter-spacing:0.4px; color:var(--text-muted); border-bottom:1px solid var(--paper-line); font-weight:600; white-space:nowrap;}
table.nhihh-table tbody td{padding:11px 16px; border-bottom:1px solid var(--paper-line); vertical-align:middle;}
table.nhihh-table tbody tr:last-child td{border-bottom:none;}
table.nhihh-table tbody tr:hover{background:rgba(199,154,46,0.06);}

/* badges & toggle */
.nhihh-badge{display:inline-flex; align-items:center; gap:5px; padding:4px 10px; border-radius:20px; font-size:11.5px; font-weight:500; white-space:nowrap;}
.nhihh-badge.ok{background:#E4EFE1; color:var(--sage);}
.nhihh-badge.off{background:#F7E3E1; color:var(--coral);}
.nhihh-badge.pending{background:var(--gold-soft); color:#7A5C13;}
.nhihh-toggle{width:38px; height:21px; border-radius:20px; background:#D8D0B8; position:relative; cursor:pointer; border:none; flex-shrink:0; transition:background .15s;}
.nhihh-toggle.on{background:var(--sage);}
.nhihh-toggle .knob{position:absolute; top:2px; left:2px; width:17px; height:17px; border-radius:50%; background:#fff; transition:left .15s;}
.nhihh-toggle.on .knob{left:19px;}

/* inputs */
.nhihh-field{margin-bottom:16px;}
.nhihh-field label{display:block; font-size:12.5px; color:var(--text-muted); margin-bottom:6px; font-weight:500;}
.nhihh-input, .nhihh-select, .nhihh-textarea{width:100%; padding:9px 12px; border:1px solid var(--paper-line); border-radius:8px; background:var(--paper); font-size:13.5px; color:var(--text-dark); font-family:'IBM Plex Sans',sans-serif;}
.nhihh-textarea{resize:vertical; min-height:64px;}
.nhihh-input:focus, .nhihh-select:focus, .nhihh-textarea:focus{outline:2px solid var(--gold); outline-offset:1px;}

/* modal */
.nhihh-modal-overlay{position:fixed; inset:0; background:rgba(27,58,43,0.35); display:flex; align-items:center; justify-content:center; z-index:50; padding:20px;}
.nhihh-modal{background:var(--paper); border-radius:14px; padding:26px; width:100%; max-width:420px; box-shadow:0 20px 50px rgba(0,0,0,0.25);}
.nhihh-modal h2{font-family:'Fraunces',serif; font-size:19px; margin:0 0 18px 0;}

/* toast */
.nhihh-toast{position:fixed; bottom:24px; right:24px; background:var(--ink); color:#F4EFE0; padding:12px 20px; border-radius:9px; font-size:13px; display:flex; align-items:center; gap:8px; z-index:60; box-shadow:0 8px 24px rgba(0,0,0,0.2); animation:nhihh-toast-in .18s ease;}
@keyframes nhihh-toast-in{from{opacity:0; transform:translateY(8px);} to{opacity:1; transform:translateY(0);}}

.nhihh-empty{padding:40px 20px; text-align:center; color:var(--text-muted); font-size:13.5px;}
.nhihh-note{background:var(--paper); border:1px dashed var(--paper-line); border-radius:9px; padding:12px 14px; font-size:12.5px; color:var(--text-muted); margin-bottom:12px;}
.nhihh-note b{color:var(--text-dark);}
.nhihh-steplist{display:flex; flex-direction:column; gap:8px;}
.nhihh-step-row{display:flex; align-items:center; gap:8px;}
.nhihh-step-row .idx{width:24px; height:24px; border-radius:6px; background:var(--gold-soft); color:#7A5C13; font-size:12px; font-weight:700; display:flex; align-items:center; justify-content:center; flex-shrink:0; font-family:'Fraunces',serif;}

/* ---------------------- public (customer) page ---------------------- */
.nhihh-link-admin{background:transparent; border:none; color:var(--text-muted); font-size:11.5px; cursor:pointer; text-decoration:underline; padding:6px 4px;}
.nhihh-link-admin:hover{color:var(--ink);}

.nhihh-public-header{display:flex; align-items:center; justify-content:space-between; padding:20px 24px; max-width:720px; margin:0 auto; width:100%;}
.nhihh-public-header .brand{display:flex; align-items:center; gap:9px;}
.nhihh-public-header .brand .mark{width:32px; height:32px; border-radius:8px; color:#2A2000; display:flex; align-items:center; justify-content:center; font-weight:700; font-family:'Fraunces',serif; font-size:17px; flex-shrink:0;}
.nhihh-public-header .brand .name{font-family:'Fraunces',serif; font-weight:600; font-size:17px;}

.nhihh-hero{text-align:center; padding:30px 24px 22px 24px; max-width:620px; margin:0 auto;}
.nhihh-hero h1{font-size:32px; font-weight:700; margin:0 0 10px 0; color:var(--ink);}
.nhihh-hero .slogan{font-size:14.5px; color:var(--text-muted); margin:0 0 18px 0;}
.nhihh-hero .contacts{display:flex; gap:10px; justify-content:center; flex-wrap:wrap;}

.nhihh-steps-band{max-width:600px; margin:0 auto 22px auto; background:var(--paper-alt); border:1px solid var(--paper-line); border-radius:12px; padding:20px 24px;}
.nhihh-steps-band h3{font-family:'Fraunces',serif; font-size:15px; margin:0 0 12px 0; color:var(--ink);}
.nhihh-steps-band ol{list-style:none; margin:0; padding:0; display:flex; flex-direction:column; gap:9px;}
.nhihh-steps-band li{display:flex; align-items:flex-start; gap:10px; font-size:13.5px; line-height:1.5;}
.nhihh-steps-band li .idx{flex-shrink:0; width:22px; height:22px; border-radius:6px; background:var(--gold-soft); color:#7A5C13; font-size:11.5px; font-weight:700; display:flex; align-items:center; justify-content:center; font-family:'Fraunces',serif;}

.nhihh-convert-wrap{max-width:520px; margin:0 auto 24px auto; padding:0 20px;}
.nhihh-result-link{display:flex; align-items:center; gap:10px; background:var(--paper); border:1px solid var(--paper-line); border-radius:9px; padding:12px 14px; margin-bottom:14px; flex-wrap:wrap;}
.nhihh-result-link .mono{flex:1; font-size:13.5px; word-break:break-all; min-width:180px;}

.nhihh-history-wrap{max-width:660px; margin:0 auto 40px auto; padding:0 20px;}
.nhihh-public-footer{text-align:center; font-size:11.5px; color:var(--text-muted); padding:10px 20px 30px 20px;}

.nhihh-lock-wrap{min-height:100vh; display:flex; align-items:center; justify-content:center; padding:20px;}
.nhihh-lock-card{width:100%; max-width:360px;}
.nhihh-lock-card h2{margin:0 0 18px 0; color:var(--ink);}

@media (max-width: 860px){
  .nhihh-admin-shell{flex-direction:column;}
  .nhihh-sidebar{display:none;}
  .nhihh-mobile-bar{display:flex; overflow-x:auto; gap:4px; padding:10px 12px; background:var(--ink); position:sticky; top:0; z-index:10;}
  .nhihh-mobile-bar button{flex-shrink:0; display:flex; align-items:center; gap:6px; padding:8px 12px; border-radius:7px; border:none; background:transparent; color:#D9D3BF; font-size:12px; white-space:nowrap;}
  .nhihh-mobile-bar button.active{background:rgba(199,154,46,0.2); color:#FBEFCF;}
  .nhihh-stats-row{grid-template-columns:repeat(2,1fr);}
  .nhihh-grid-2{grid-template-columns:1fr;}
  .nhihh-content{padding:18px;}
  .nhihh-topbar{padding:16px 18px;}
  table.nhihh-table{font-size:12px;}
}
@media (max-width: 520px){
  .nhihh-hero h1{font-size:25px;}
}
`;

/* ----------------------------- helpers ----------------------------- */
const VN_NAMES = ["Nguyễn Văn A","Trần Thị B","Lê Văn C","Phạm Thị D","Hoàng Văn E","Đỗ Minh F","Vũ Thị G","Bùi Văn H","Ngô Thị I","Dương Văn K","Đặng Thị L","Phan Văn M","Trịnh Thị N","Lý Văn O","Hồ Thị P"];
const PRODUCTS = ["Áo thun nam basic","Nồi chiên không dầu 5L","Tai nghe Bluetooth chụp tai","Kem chống nắng SPF50","Bàn phím cơ mini 60%","Giày sneaker trắng unisex","Máy sấy tóc ion 2000W","Balo laptop chống nước","Son kem lì màu Rose","Sạc dự phòng 20000mAh","Bình giữ nhiệt 500ml","Quạt mini để bàn USB"];

function pad(n){ return n<10 ? "0"+n : ""+n; }
function isoDaysAgo(d){ const t=new Date(); t.setDate(t.getDate()-d); t.setHours(9+Math.floor(Math.random()*10), Math.floor(Math.random()*60)); return t.toISOString(); }
function fmtDateTime(iso){ const d=new Date(iso); return `${pad(d.getDate())}/${pad(d.getMonth()+1)} ${pad(d.getHours())}:${pad(d.getMinutes())}`; }
function fmtDate(iso){ const d=new Date(iso); return `${pad(d.getDate())}/${pad(d.getMonth()+1)}/${d.getFullYear()}`; }
function fmtVND(n){ return n.toLocaleString("vi-VN")+"₫"; }
function fmtShortVND(n){
  if(n>=1000000) return (Math.round(n/100000)/10).toString().replace(/\.0$/,"")+"Tr₫";
  if(n>=1000) return Math.round(n/1000)+"K₫";
  return n+"₫";
}
function randInt(a,b){ return a+Math.floor(Math.random()*(b-a+1)); }
function genId(prefix){ return prefix+"_"+Math.random().toString(36).slice(2,9); }

function seedUsers(){
  const roles = ["Affiliate","Affiliate","Affiliate","Affiliate","Editor","Affiliate","Affiliate","Affiliate","Affiliate","Affiliate","Admin","Affiliate","Affiliate","Affiliate","Affiliate"];
  const linkCounts = [120,98,76,54,32,18,9,0,5,2,0,14,3,1,0];
  return VN_NAMES.map((name,i)=>{
    const links = linkCounts[i] ?? randInt(0,20);
    return {
      id: genId("u"),
      name,
      zalo: "09"+randInt(10,99)+" xxx "+randInt(1000,9999),
      phone: "09"+randInt(10000000,99999999),
      joined: isoDaysAgo(randInt(5,140)).slice(0,10),
      linksConverted: links,
      commission: links * randInt(18000,30000),
      status: i===7 ? "paused" : "active",
      role: roles[i] || "Affiliate",
    };
  });
}

function seedLinks(list){
  const arr = [];
  const statuses = ["success","success","success","pending","cancelled"];
  for(let i=0;i<28;i++){
    const u = list[randInt(0,list.length-1)];
    const p = PRODUCTS[randInt(0,PRODUCTS.length-1)];
    arr.push({
      id: genId("lk"),
      user: u.name,
      zaloLast4: u.zalo.slice(-4),
      product: p,
      originalLink: "shopee.vn/"+p.toLowerCase().split(" ")[0]+"-p"+randInt(1000,9999),
      affLink: "shp.ee/"+Math.random().toString(36).slice(2,8),
      time: isoDaysAgo(randInt(0,30)),
      status: statuses[randInt(0,statuses.length-1)],
    });
  }
  return arr.sort((a,b)=> new Date(b.time)-new Date(a.time));
}

function seedCommissions(list){
  return list.filter(u=>u.linksConverted>0).map(u=>({
    id: genId("cm"),
    user: u.name,
    amount: u.commission,
    date: isoDaysAgo(randInt(0,25)).slice(0,10),
    status: Math.random()>0.55 ? "paid":"pending",
  }));
}

function seedSettings(){
  return {
    content:{
      title:"NhiHH Link",
      slogan:"Mua sắm thảnh thơi, hoàn tiền tức thì",
      steps:["Xóa sản phẩm khỏi giỏ hàng Shopee trước khi bấm link mới","Dùng nút Mua ngay để mã liên kết được áp dụng cho đơn"],
      zaloLink:"https://zalo.me/g/nhihhlink",
      facebookLink:"https://facebook.com/nhihhlink",
      logoColor:"#C79A2E",
    },
    shopee:{
      affiliateId:"17382050410",
      active:true,
    },
    config:{
      maintenanceMode:false,
      affiliateDomain:"https://shopee.vn/",
      notifyNewUser:true,
      notifyConversion:true,
      conversionPaused:false,
      lastBackup:new Date().toISOString().slice(0,10),
      adminPin:"1907",
    }
  };
}

function isValidShopeeLink(url){
  if(!url) return false;
  const trimmed = url.trim();
  if(!/^https?:\/\//i.test(trimmed)) return false;
  if(!/shopee|shp\.ee/i.test(trimmed)) return false;
  return true;
}

function findOrCreateUser(users, {name, phone, zalo}){
  const cleanPhone = (phone||"").replace(/\s/g,"");
  const matched = users.find(u => (u.phone||"").replace(/\s/g,"") === cleanPhone && cleanPhone);
  if(matched){
    const next = users.map(u => u.id===matched.id ? {...u, linksConverted:(u.linksConverted||0)+1} : u);
    return {users: next, user: matched};
  }
  const nu = {
    id: genId("u"), name: name.trim(), zalo: (zalo||phone).trim(), phone: phone.trim(),
    joined: new Date().toISOString().slice(0,10), linksConverted:1, commission:0, status:"active", role:"Affiliate",
  };
  return {users:[nu, ...users], user: nu};
}

/* ----------------------------- small components ----------------------------- */
function Toggle({checked,onChange}){
  return (
    <button type="button" className={"nhihh-toggle"+(checked?" on":"")} onClick={()=>onChange(!checked)} aria-pressed={checked}>
      <span className="knob"/>
    </button>
  );
}

function StatCard({icon:Icon,label,value,tone}){
  return (
    <div className="nhihh-stat-card">
      <div className="label"><Icon size={14}/> {label}</div>
      <div className={"value mono"+(tone?" "+tone:"")}>{value}</div>
    </div>
  );
}

function Badge({status}){
  if(status==="active"||status==="success"||status==="paid") return <span className="nhihh-badge ok"><CheckCircle2 size={12}/> {status==="paid"?"Đã trả":status==="success"?"Thành công":"Hoạt động"}</span>;
  if(status==="paused"||status==="cancelled") return <span className="nhihh-badge off"><Ban size={12}/> {status==="cancelled"?"Đã hủy":"Tạm dừng"}</span>;
  return <span className="nhihh-badge pending">Chờ xử lý</span>;
}

function Modal({title,children,onClose}){
  return (
    <div className="nhihh-modal-overlay" onClick={onClose}>
      <div className="nhihh-modal" onClick={e=>e.stopPropagation()}>
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
}

function MiniBarChart({data}){
  const max = Math.max(...data.map(d=>d.value),1);
  return (
    <div style={{display:"flex", alignItems:"flex-end", gap:10, height:150, padding:"6px 4px 0 4px"}}>
      {data.map((d,i)=>(
        <div key={i} style={{flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:6}}>
          <div className="mono" style={{fontSize:10.5, color:"var(--text-muted)"}}>{d.value}</div>
          <div style={{width:"100%", maxWidth:34, height:Math.max(6,(d.value/max)*100), background: i===data.length-1 ? "var(--gold)" : "var(--sage)", borderRadius:"4px 4px 2px 2px", transition:"height .3s"}}/>
          <div style={{fontSize:11, color:"var(--text-muted)"}}>{d.day}</div>
        </div>
      ))}
    </div>
  );
}

/* ============================= CUSTOMER PAGE ============================= */
function CustomerPage({settings, links, users, updateLinks, updateUsers, goAdmin}){
  const [form,setForm] = useState({name:"", phone:"", zalo:"", product:"", link:""});
  const [error,setError] = useState("");
  const [result,setResult] = useState(null);
  const [mySubs,setMySubs] = useState([]);

  const maintenance = settings.config.maintenanceMode;
  const paused = settings.config.conversionPaused;

  function handleChange(field,val){ setForm(f=>({...f,[field]:val})); if(error) setError(""); }

  function handleSubmit(e){
    e.preventDefault();
    if(maintenance){ setError("Hệ thống đang bảo trì, vui lòng quay lại sau."); return; }
    if(paused){ setError("Tính năng chuyển đổi link đang tạm dừng, vui lòng thử lại sau."); return; }
    if(!form.name.trim()){ setError("Vui lòng nhập họ tên của bạn."); return; }
    if(!form.phone.trim() || form.phone.trim().replace(/\D/g,"").length<9){ setError("Vui lòng nhập số điện thoại hợp lệ."); return; }
    if(!isValidShopeeLink(form.link)){ setError("Vui lòng dán đúng link sản phẩm Shopee (bắt đầu bằng http/https và chứa shopee)."); return; }

    const affLink = "shp.ee/"+Math.random().toString(36).slice(2,8);
    const newLink = {
      id: genId("lk"),
      user: form.name.trim(),
      zaloLast4: (form.zalo.trim()||form.phone.trim()).slice(-4),
      product: form.product.trim() || "Chưa xác định",
      originalLink: form.link.trim(),
      affLink,
      time: new Date().toISOString(),
      status: "pending",
      phone: form.phone.trim(),
    };

    const {users: nextUsers} = findOrCreateUser(users, {name:form.name, phone:form.phone, zalo:form.zalo});
    updateUsers(nextUsers);
    updateLinks([newLink, ...links]);
    setResult(newLink);
    setMySubs(prev=>[newLink, ...prev]);
    setForm(f=>({...f, product:"", link:""}));
  }

  function copyResult(){
    if(result) navigator.clipboard?.writeText("https://"+result.affLink);
  }

  return (
    <div className="nhihh-root" style={{display:"block"}}>
      <style>{STYLE}</style>

      <div className="nhihh-public-header">
        <div className="brand">
          <div className="mark" style={{background:settings.content.logoColor}}>{(settings.content.title||"N")[0]}</div>
          <div className="name">{settings.content.title}</div>
        </div>
        <button className="nhihh-link-admin" onClick={goAdmin}>Quản trị viên</button>
      </div>

      <div className="nhihh-hero">
        <h1 className="display">{settings.content.title}</h1>
        <p className="slogan">{settings.content.slogan}</p>
        <div className="contacts">
          {settings.content.zaloLink && <a className="nhihh-btn nhihh-btn-ghost nhihh-btn-sm" href={settings.content.zaloLink} target="_blank" rel="noreferrer">Nhắn Zalo</a>}
          {settings.content.facebookLink && <a className="nhihh-btn nhihh-btn-ghost nhihh-btn-sm" href={settings.content.facebookLink} target="_blank" rel="noreferrer">Facebook</a>}
        </div>
      </div>

      {maintenance && (
        <div className="nhihh-banner" style={{maxWidth:520, margin:"0 auto 20px auto"}}>
          <AlertTriangle size={15}/> Hệ thống đang bảo trì, vui lòng quay lại sau.
        </div>
      )}
      {!maintenance && paused && (
        <div className="nhihh-banner" style={{maxWidth:520, margin:"0 auto 20px auto"}}>
          <PauseCircle size={15}/> Tính năng chuyển đổi link đang tạm dừng.
        </div>
      )}

      {settings.content.steps.length>0 && (
        <div className="nhihh-steps-band">
          <h3>Hướng dẫn nhanh</h3>
          <ol>
            {settings.content.steps.map((s,i)=>(
              <li key={i}><span className="idx">{i+1}</span><span>{s}</span></li>
            ))}
          </ol>
        </div>
      )}

      <div className="nhihh-convert-wrap">
        {!result ? (
          <form className="nhihh-card" onSubmit={handleSubmit}>
            <h3>Chuyển đổi link Shopee của bạn</h3>
            <div className="nhihh-field"><label>Họ tên</label><input className="nhihh-input" value={form.name} onChange={e=>handleChange("name",e.target.value)} placeholder="Nguyễn Văn A"/></div>
            <div className="nhihh-field"><label>Số điện thoại</label><input className="nhihh-input" value={form.phone} onChange={e=>handleChange("phone",e.target.value)} placeholder="09xxxxxxxx"/></div>
            <div className="nhihh-field"><label>Zalo (không bắt buộc)</label><input className="nhihh-input" value={form.zalo} onChange={e=>handleChange("zalo",e.target.value)} placeholder="Tên Zalo hoặc số Zalo"/></div>
            <div className="nhihh-field"><label>Tên sản phẩm (không bắt buộc)</label><input className="nhihh-input" value={form.product} onChange={e=>handleChange("product",e.target.value)} placeholder="VD: Nồi chiên không dầu 5L"/></div>
            <div className="nhihh-field"><label>Link sản phẩm Shopee</label><textarea className="nhihh-textarea" value={form.link} onChange={e=>handleChange("link",e.target.value)} placeholder="Dán link sản phẩm Shopee vào đây…"/></div>
            {error && <div className="nhihh-note" style={{borderColor:"#E3B6AE", color:"var(--coral)"}}><AlertTriangle size={13} style={{display:"inline", marginRight:6, verticalAlign:-2}}/>{error}</div>}
            <button className="nhihh-btn nhihh-btn-primary" type="submit" disabled={maintenance||paused}><Link2 size={14}/> Lấy link hoàn tiền</button>
          </form>
        ) : (
          <div className="nhihh-card">
            <h3><CheckCircle2 size={16} style={{color:"var(--sage)", display:"inline", marginRight:6, verticalAlign:-2}}/>Link của bạn đã sẵn sàng</h3>
            <div className="nhihh-result-link">
              <span className="mono">{"https://"+result.affLink}</span>
              <button className="nhihh-btn nhihh-btn-gold nhihh-btn-sm" onClick={copyResult}><Copy size={13}/> Sao chép</button>
            </div>
            <div className="nhihh-note"><b>Lưu ý:</b> Xóa sản phẩm khỏi giỏ hàng Shopee trước khi bấm link mới, dùng nút "Mua ngay" để đơn được ghi nhận. Trạng thái đơn hiển thị sau 24–48h.</div>
            <button className="nhihh-btn nhihh-btn-ghost" onClick={()=>setResult(null)}><RotateCcw size={14}/> Chuyển đổi link khác</button>
          </div>
        )}
      </div>

      {mySubs.length>0 && (
        <div className="nhihh-history-wrap">
          <div className="nhihh-card">
            <h3>Link đã chuyển trong phiên này</h3>
            <div className="nhihh-table-wrap" style={{border:"none"}}>
              <table className="nhihh-table">
                <thead><tr><th>Sản phẩm</th><th>Link</th><th>Thời gian</th><th>Trạng thái</th></tr></thead>
                <tbody>
                  {mySubs.map(l=>{
                    const live = links.find(x=>x.id===l.id) || l;
                    return (
                      <tr key={l.id}>
                        <td>{live.product}</td>
                        <td className="mono">{live.affLink}</td>
                        <td className="mono">{fmtDateTime(live.time)}</td>
                        <td><Badge status={live.status}/></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <div className="nhihh-public-footer">© {new Date().getFullYear()} {settings.content.title}</div>
    </div>
  );
}

/* ============================= ADMIN LOCK ============================= */
function AdminLock({correctPin, onSuccess, onBack}){
  const [pin,setPin] = useState("");
  const [err,setErr] = useState("");

  function submit(e){
    e.preventDefault();
    if(pin === correctPin) onSuccess();
    else setErr("Mã PIN không đúng, vui lòng thử lại.");
  }

  return (
    <div className="nhihh-root" style={{display:"block"}}>
      <style>{STYLE}</style>
      <div className="nhihh-lock-wrap">
        <form className="nhihh-card nhihh-lock-card" onSubmit={submit}>
          <h2 className="display">Đăng nhập quản trị</h2>
          <div className="nhihh-field">
            <label>Mã PIN</label>
            <input className="nhihh-input mono" type="password" value={pin} autoFocus
              onChange={e=>{setPin(e.target.value); setErr("");}} placeholder="••••"/>
          </div>
          {err && <div className="nhihh-note" style={{borderColor:"#E3B6AE", color:"var(--coral)"}}>{err}</div>}
          <div style={{display:"flex", gap:10, marginTop:6}}>
            <button type="button" className="nhihh-btn nhihh-btn-ghost" onClick={onBack}>Quay lại</button>
            <button type="submit" className="nhihh-btn nhihh-btn-primary"><KeyRound size={14}/> Vào trang quản trị</button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ============================= ADMIN PANEL ============================= */
const NAV = [
  {key:"dashboard", label:"Tổng quan", icon:LayoutDashboard},
  {key:"links", label:"Link", icon:Link2},
  {key:"users", label:"Người dùng", icon:Users},
  {key:"commissions", label:"Hoa hồng", icon:CircleDollarSign},
  {key:"content", label:"Nội dung", icon:FileEdit},
  {key:"shopee", label:"Kết nối Shopee", icon:ShoppingBag},
  {key:"config", label:"Cấu hình", icon:Settings},
];

function AdminPanel({users, links, commissions, settings, updateUsers, updateLinks, updateCommissions, updateSettings, showToast, goCustomer, onLogout}){
  const [page,setPage] = useState("dashboard");
  const today = new Date();
  const monthLabel = `Tháng ${today.getMonth()+1}, ${today.getFullYear()}`;
  const pageInfo = NAV.find(n=>n.key===page);

  function confirmSuccess(link, amountStr){
    const amount = Number(String(amountStr).replace(/\D/g,"")) || 0;
    const nextLinks = links.map(l=> l.id===link.id ? {...l, status:"success"} : l);
    updateLinks(nextLinks);
    const cm = {id:genId("cm"), user:link.user, amount, date:new Date().toISOString().slice(0,10), status:"pending"};
    updateCommissions([cm, ...commissions], "Đã xác nhận đơn và ghi nhận hoa hồng");
    const nextUsers = users.map(u => u.name===link.user ? {...u, commission:(u.commission||0)+amount} : u);
    updateUsers(nextUsers);
  }
  function cancelLink(link){
    const nextLinks = links.map(l=> l.id===link.id ? {...l, status:"cancelled"} : l);
    updateLinks(nextLinks, "Đã hủy đơn");
  }

  return (
    <div className="nhihh-root nhihh-admin-shell">
      <style>{STYLE}</style>

      {/* desktop sidebar */}
      <aside className="nhihh-sidebar">
        <div className="nhihh-logo">
          <div className="mark">N</div>
          <div>
            <div className="name">{settings.content.title}</div>
            <div className="sub">Admin</div>
          </div>
        </div>
        <nav className="nhihh-nav">
          {NAV.map(item=>(
            <button key={item.key} className={"nhihh-nav-item"+(page===item.key?" active":"")} onClick={()=>setPage(item.key)}>
              <item.icon size={16}/> {item.label}
            </button>
          ))}
        </nav>
        <div className="nhihh-sidebar-actions">
          <button className="nhihh-btn nhihh-btn-ghost nhihh-btn-sm" onClick={goCustomer}><ExternalLink size={12}/> Xem trang khách hàng</button>
          <button className="nhihh-btn nhihh-btn-ghost nhihh-btn-sm" onClick={onLogout}><KeyRound size={12}/> Đăng xuất</button>
        </div>
        <div className="nhihh-sidebar-footer">© {today.getFullYear()} {settings.content.title}<br/>All rights reserved</div>
      </aside>

      {/* mobile nav */}
      <div className="nhihh-mobile-bar">
        {NAV.map(item=>(
          <button key={item.key} className={page===item.key?"active":""} onClick={()=>setPage(item.key)}>
            <item.icon size={14}/> {item.label}
          </button>
        ))}
      </div>

      <div className="nhihh-main">
        <div className="nhihh-topbar">
          <h1><pageInfo.icon size={20}/> {pageInfo.label}</h1>
          <div className="date mono">{monthLabel}</div>
        </div>

        <div className="nhihh-content">
          {settings.config.maintenanceMode && (
            <div className="nhihh-banner"><AlertTriangle size={15}/> Chế độ bảo trì đang bật — khách hàng sẽ không thể chuyển đổi link.</div>
          )}

          {page==="dashboard" && <Dashboard users={users} links={links} commissions={commissions} monthLabel={monthLabel}/>}
          {page==="links" && <LinksPage links={links} updateLinks={updateLinks} settings={settings} updateSettings={updateSettings} showToast={showToast} goShopee={()=>setPage("shopee")} onConfirmSuccess={confirmSuccess} onCancelLink={cancelLink}/>}
          {page==="users" && <UsersPage users={users} updateUsers={updateUsers} showToast={showToast}/>}
          {page==="commissions" && <CommissionsPage commissions={commissions} updateCommissions={updateCommissions} monthLabel={monthLabel}/>}
          {page==="content" && <ContentPage settings={settings} updateSettings={updateSettings}/>}
          {page==="shopee" && <ShopeePage settings={settings} updateSettings={updateSettings}/>}
          {page==="config" && <ConfigPage settings={settings} updateSettings={updateSettings}/>}
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- Dashboard ----------------------------- */
function Dashboard({users,links,commissions,monthLabel}){
  const activeUsers = users.length;
  const totalLinks = links.length;
  const thisMonthCommission = commissions.reduce((s,c)=>s+c.amount,0);
  const pendingCommission = commissions.filter(c=>c.status==="pending").reduce((s,c)=>s+c.amount,0);

  const days = ["T2","T3","T4","T5","T6","T7","CN"];
  const chartData = days.map((d,i)=>{
    const count = links.filter(l=>{
      const dt = new Date(l.time); const diff = Math.floor((new Date()-dt)/86400000);
      return diff===(6-i);
    }).length;
    return {day:d, value: count};
  });

  const top5 = [...users].sort((a,b)=>b.linksConverted-a.linksConverted).slice(0,5);

  return (
    <>
      <div className="nhihh-stats-row">
        <StatCard icon={Users} label="Người dùng" value={activeUsers}/>
        <StatCard icon={Link2} label="Link đã chuyển" value={totalLinks}/>
        <StatCard icon={CircleDollarSign} label={`Hoa hồng ${monthLabel.toLowerCase()}`} value={fmtShortVND(thisMonthCommission)} tone="gold"/>
        <StatCard icon={CircleDollarSign} label="Hoa hồng chưa thanh toán" value={fmtShortVND(pendingCommission)} tone="coral"/>
      </div>

      <div className="nhihh-grid-2">
        <div className="nhihh-card">
          <h3><TrendingUp size={15} style={{display:"inline", marginRight:6, verticalAlign:-2}}/>Biểu đồ chuyển đổi 7 ngày gần nhất</h3>
          <MiniBarChart data={chartData}/>
        </div>

        <div>
          <div className="nhihh-ticket">
            <h3><Trophy size={15}/> Top 5 Affiliate</h3>
            {top5.map((u,i)=>(
              <div className="nhihh-lb-row" key={u.id}>
                <span className="rank">{i+1}.</span>
                <span className="name">{u.name}</span>
                <span className="dots"/>
                <span className="stats">{u.linksConverted} link → <b>{fmtShortVND(u.commission)}</b></span>
              </div>
            ))}
            {top5.length===0 && <div className="nhihh-empty">Chưa có dữ liệu.</div>}
          </div>
          <div className="nhihh-ticket-tear"/>
        </div>
      </div>
    </>
  );
}

/* ----------------------------- Links Page ----------------------------- */
function LinksPage({links,updateLinks,settings,updateSettings,showToast,goShopee,onConfirmSuccess,onCancelLink}){
  const [tab,setTab] = useState("all");
  const [q,setQ] = useState("");
  const [confirmingLink,setConfirmingLink] = useState(null);
  const [amount,setAmount] = useState("");

  const filtered = links.filter(l=>{
    const now = new Date(); const dt = new Date(l.time); const diffDays = (now-dt)/86400000;
    if(tab==="today" && diffDays>1) return false;
    if(tab==="7d" && diffDays>7) return false;
    if(tab==="month" && dt.getMonth()!==now.getMonth()) return false;
    if(q && !(l.user.toLowerCase().includes(q.toLowerCase()) || l.product.toLowerCase().includes(q.toLowerCase()))) return false;
    return true;
  });

  const paused = settings.config.conversionPaused;

  function togglePause(){
    const next = {...settings, config:{...settings.config, conversionPaused: !paused}};
    updateSettings(next, paused ? "Đã bật lại chuyển đổi link" : "Đã tạm dừng chuyển đổi link");
  }

  return (
    <>
      {paused && <div className="nhihh-banner"><PauseCircle size={15}/> Tính năng chuyển đổi link đang tạm dừng.</div>}

      <div className="nhihh-toolbar">
        <div className="nhihh-search"><Search size={14} color="var(--text-muted)"/><input placeholder="Tìm theo người dùng hoặc sản phẩm…" value={q} onChange={e=>setQ(e.target.value)}/></div>
        <button className={"nhihh-tab"+(tab==="today"?" active":"")} onClick={()=>setTab("today")}>Hôm nay</button>
        <button className={"nhihh-tab"+(tab==="7d"?" active":"")} onClick={()=>setTab("7d")}>7 ngày</button>
        <button className={"nhihh-tab"+(tab==="month"?" active":"")} onClick={()=>setTab("month")}>Tháng này</button>
        <button className={"nhihh-tab"+(tab==="all"?" active":"")} onClick={()=>setTab("all")}>Tất cả</button>
        <button className="nhihh-btn nhihh-btn-ghost nhihh-btn-sm" onClick={()=>showToast("Đã xuất file Excel (mô phỏng)")}><Download size={14}/> Xuất Excel</button>
      </div>

      <div className="nhihh-table-wrap">
        <table className="nhihh-table">
          <thead><tr><th>#</th><th>Người dùng</th><th>Sản phẩm</th><th>Link gốc</th><th>Link AF</th><th>Thời gian</th><th>Trạng thái</th><th>Hành động</th></tr></thead>
          <tbody>
            {filtered.slice(0,50).map((l,i)=>(
              <tr key={l.id}>
                <td className="mono">{i+1}</td>
                <td>{l.user} <span style={{color:"var(--text-muted)", fontSize:11}}>•{l.zaloLast4}</span></td>
                <td>{l.product}</td>
                <td className="mono" style={{color:"var(--text-muted)", maxWidth:180, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap"}} title={l.originalLink}>{l.originalLink}</td>
                <td className="mono">{l.affLink}</td>
                <td className="mono">{fmtDateTime(l.time)}</td>
                <td><Badge status={l.status}/></td>
                <td>
                  {l.status==="pending" ? (
                    <div style={{display:"flex", gap:6}}>
                      <button className="nhihh-btn nhihh-btn-gold nhihh-btn-sm" onClick={()=>{setConfirmingLink(l); setAmount("");}}><Check size={12}/> Xác nhận</button>
                      <button className="nhihh-btn nhihh-btn-danger nhihh-btn-sm" onClick={()=>onCancelLink(l)}><X size={12}/> Hủy</button>
                    </div>
                  ) : <span style={{color:"var(--text-muted)", fontSize:12}}>—</span>}
                </td>
              </tr>
            ))}
            {filtered.length===0 && <tr><td colSpan={8} className="nhihh-empty">Không có link nào khớp bộ lọc.</td></tr>}
          </tbody>
        </table>
      </div>

      <div style={{display:"flex", gap:10, marginTop:16}}>
        <button className="nhihh-btn nhihh-btn-ghost" onClick={goShopee}><Settings size={14}/> Cấu hình link mặc định</button>
        <button className={"nhihh-btn "+(paused?"nhihh-btn-gold":"nhihh-btn-danger")} onClick={togglePause}>
          {paused ? <><PlayCircle size={14}/> Bật lại chuyển đổi</> : <><PauseCircle size={14}/> Tạm dừng chuyển đổi</>}
        </button>
      </div>

      {confirmingLink && (
        <Modal title="Xác nhận đơn thành công" onClose={()=>setConfirmingLink(null)}>
          <p style={{fontSize:13, color:"var(--text-muted)", marginTop:0}}>Khách hàng: <b>{confirmingLink.user}</b> — {confirmingLink.product}</p>
          <div className="nhihh-field"><label>Hoa hồng dự kiến (₫)</label><input className="nhihh-input mono" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="VD: 25000" autoFocus/></div>
          <div style={{display:"flex", gap:10, justifyContent:"flex-end"}}>
            <button className="nhihh-btn nhihh-btn-ghost" onClick={()=>setConfirmingLink(null)}>Hủy</button>
            <button className="nhihh-btn nhihh-btn-primary" onClick={()=>{onConfirmSuccess(confirmingLink, amount); setConfirmingLink(null);}}><Check size={14}/> Xác nhận</button>
          </div>
        </Modal>
      )}
    </>
  );
}

/* ----------------------------- Users Page ----------------------------- */
function UsersPage({users,updateUsers,showToast}){
  const [q,setQ] = useState("");
  const [showAdd,setShowAdd] = useState(false);
  const [form,setForm] = useState({name:"",zalo:"",phone:"",role:"Affiliate"});

  const filtered = users.filter(u=> !q || u.zalo.toLowerCase().includes(q.toLowerCase()) || u.phone.includes(q) || u.name.toLowerCase().includes(q.toLowerCase()));

  function toggleStatus(id){
    const next = users.map(u=> u.id===id ? {...u, status: u.status==="active"?"paused":"active"} : u);
    updateUsers(next, "Đã cập nhật trạng thái tài khoản");
  }
  function changeRole(id, role){
    const next = users.map(u=> u.id===id ? {...u, role} : u);
    updateUsers(next, "Đã cập nhật quyền");
  }
  function resetPassword(name){
    showToast(`Đã gửi liên kết đặt lại mật khẩu tới ${name} qua Zalo`);
  }
  function addUser(){
    if(!form.name.trim() || !form.zalo.trim()) { showToast("Vui lòng nhập tên và Zalo"); return; }
    const nu = {id:genId("u"), name:form.name, zalo:form.zalo, phone:form.phone||"—", joined:new Date().toISOString().slice(0,10), linksConverted:0, commission:0, status:"active", role:form.role};
    updateUsers([nu,...users], "Đã thêm người dùng mới");
    setForm({name:"",zalo:"",phone:"",role:"Affiliate"});
    setShowAdd(false);
  }

  return (
    <>
      <div className="nhihh-toolbar">
        <div className="nhihh-search"><Search size={14} color="var(--text-muted)"/><input placeholder="Tìm Zalo/SĐT/tên…" value={q} onChange={e=>setQ(e.target.value)}/></div>
        <button className="nhihh-btn nhihh-btn-primary" onClick={()=>setShowAdd(true)}><Plus size={14}/> Thêm người dùng</button>
        <button className="nhihh-btn nhihh-btn-ghost" onClick={()=>showToast("Tính năng nhập Excel sẽ mở khi kết nối API thật")}><Upload size={14}/> Import Excel</button>
      </div>

      <div className="nhihh-table-wrap">
        <table className="nhihh-table">
          <thead><tr><th>#</th><th>Tên Zalo</th><th>4 số cuối SĐT</th><th>Ngày ĐK</th><th>Quyền</th><th>Số link đã đổi</th><th>Hoa hồng</th><th>Trạng thái</th><th></th></tr></thead>
          <tbody>
            {filtered.map((u,i)=>(
              <tr key={u.id}>
                <td className="mono">{i+1}</td>
                <td>{u.name}</td>
                <td className="mono">{u.phone.slice(-4)}</td>
                <td className="mono">{fmtDate(u.joined)}</td>
                <td>
                  <select className="nhihh-select" style={{padding:"5px 8px", fontSize:12, width:"auto"}} value={u.role} onChange={e=>changeRole(u.id,e.target.value)}>
                    <option>Admin</option><option>Editor</option><option>Affiliate</option>
                  </select>
                </td>
                <td className="mono">{u.linksConverted}</td>
                <td className="mono">{fmtShortVND(u.commission)}</td>
                <td><button onClick={()=>toggleStatus(u.id)} style={{border:"none", background:"none", cursor:"pointer"}}><Badge status={u.status}/></button></td>
                <td><button className="nhihh-btn nhihh-btn-ghost nhihh-btn-sm" onClick={()=>resetPassword(u.name)}><KeyRound size={12}/> Reset MK</button></td>
              </tr>
            ))}
            {filtered.length===0 && <tr><td colSpan={9} className="nhihh-empty">Không tìm thấy người dùng phù hợp.</td></tr>}
          </tbody>
        </table>
      </div>

      {showAdd && (
        <Modal title="Thêm người dùng" onClose={()=>setShowAdd(false)}>
          <div className="nhihh-field"><label>Tên Zalo</label><input className="nhihh-input" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></div>
          <div className="nhihh-field"><label>Zalo</label><input className="nhihh-input" value={form.zalo} onChange={e=>setForm({...form,zalo:e.target.value})}/></div>
          <div className="nhihh-field"><label>Số điện thoại</label><input className="nhihh-input" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/></div>
          <div className="nhihh-field"><label>Vai trò</label>
            <select className="nhihh-select" value={form.role} onChange={e=>setForm({...form,role:e.target.value})}>
              <option>Admin</option><option>Editor</option><option>Affiliate</option>
            </select>
          </div>
          <div style={{display:"flex", gap:10, justifyContent:"flex-end"}}>
            <button className="nhihh-btn nhihh-btn-ghost" onClick={()=>setShowAdd(false)}>Hủy</button>
            <button className="nhihh-btn nhihh-btn-primary" onClick={addUser}><Plus size={14}/> Thêm</button>
          </div>
        </Modal>
      )}
    </>
  );
}

/* ----------------------------- Commissions Page ----------------------------- */
function CommissionsPage({commissions,updateCommissions,monthLabel}){
  const [filter,setFilter] = useState("all");
  const total = commissions.reduce((s,c)=>s+c.amount,0);
  const paid = commissions.filter(c=>c.status==="paid").reduce((s,c)=>s+c.amount,0);
  const pending = total-paid;

  const filtered = commissions.filter(c=> filter==="all" || c.status===filter);

  function markPaid(id){
    const next = commissions.map(c=> c.id===id ? {...c, status:"paid"} : c);
    updateCommissions(next, "Đã đánh dấu đã thanh toán");
  }

  return (
    <>
      <div className="nhihh-stats-row" style={{gridTemplateColumns:"repeat(3,1fr)"}}>
        <StatCard icon={CircleDollarSign} label={`Tổng hoa hồng ${monthLabel.toLowerCase()}`} value={fmtShortVND(total)}/>
        <StatCard icon={CheckCircle2} label="Đã thanh toán" value={fmtShortVND(paid)} tone="gold"/>
        <StatCard icon={AlertTriangle} label="Chưa thanh toán" value={fmtShortVND(pending)} tone="coral"/>
      </div>

      <div className="nhihh-toolbar">
        <button className={"nhihh-tab"+(filter==="all"?" active":"")} onClick={()=>setFilter("all")}>Tất cả</button>
        <button className={"nhihh-tab"+(filter==="pending"?" active":"")} onClick={()=>setFilter("pending")}>Chờ thanh toán</button>
        <button className={"nhihh-tab"+(filter==="paid"?" active":"")} onClick={()=>setFilter("paid")}>Đã trả</button>
      </div>

      <div className="nhihh-table-wrap">
        <table className="nhihh-table">
          <thead><tr><th>#</th><th>Người dùng</th><th>Số tiền</th><th>Ngày</th><th>Trạng thái</th><th></th></tr></thead>
          <tbody>
            {filtered.map((c,i)=>(
              <tr key={c.id}>
                <td className="mono">{i+1}</td>
                <td>{c.user}</td>
                <td className="mono">{fmtVND(c.amount)}</td>
                <td className="mono">{fmtDate(c.date)}</td>
                <td><Badge status={c.status}/></td>
                <td>{c.status==="pending" && <button className="nhihh-btn nhihh-btn-gold nhihh-btn-sm" onClick={()=>markPaid(c.id)}><Check size={12}/> Đánh dấu đã trả</button>}</td>
              </tr>
            ))}
            {filtered.length===0 && <tr><td colSpan={6} className="nhihh-empty">Không có bản ghi hoa hồng nào.</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}

/* ----------------------------- Content Page ----------------------------- */
function ContentPage({settings,updateSettings}){
  const [form,setForm] = useState(settings.content);

  function save(){
    updateSettings({...settings, content:form}, "Đã lưu thay đổi nội dung trang");
  }
  function updateStep(i,val){
    const steps = [...form.steps]; steps[i]=val; setForm({...form,steps});
  }
  function addStep(){ setForm({...form, steps:[...form.steps, ""]}); }
  function removeStep(i){ setForm({...form, steps: form.steps.filter((_,idx)=>idx!==i)}); }

  return (
    <div className="nhihh-grid-2">
      <div className="nhihh-card">
        <h3>Nội dung trang</h3>
        <div className="nhihh-field"><label>Tên trang</label><input className="nhihh-input" value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/></div>
        <div className="nhihh-field"><label>Slogan</label><textarea className="nhihh-textarea" value={form.slogan} onChange={e=>setForm({...form,slogan:e.target.value})}/></div>
        <div className="nhihh-field">
          <label>Hướng dẫn nhanh</label>
          <div className="nhihh-steplist">
            {form.steps.map((s,i)=>(
              <div className="nhihh-step-row" key={i}>
                <div className="idx">{i+1}</div>
                <input className="nhihh-input" value={s} onChange={e=>updateStep(i,e.target.value)}/>
                <button className="nhihh-btn nhihh-btn-danger nhihh-btn-sm" onClick={()=>removeStep(i)}><X size={12}/></button>
              </div>
            ))}
          </div>
          <button className="nhihh-btn nhihh-btn-ghost nhihh-btn-sm" style={{marginTop:8}} onClick={addStep}><Plus size={12}/> Thêm bước</button>
        </div>
        <div className="nhihh-field"><label>Link Zalo</label><input className="nhihh-input" value={form.zaloLink} onChange={e=>setForm({...form,zaloLink:e.target.value})}/></div>
        <div className="nhihh-field"><label>Link Facebook</label><input className="nhihh-input" value={form.facebookLink} onChange={e=>setForm({...form,facebookLink:e.target.value})}/></div>
        <div className="nhihh-field"><label>Màu chủ đạo</label><input type="color" value={form.logoColor} onChange={e=>setForm({...form,logoColor:e.target.value})} style={{width:60,height:36,border:"1px solid var(--paper-line)",borderRadius:8,padding:2,background:"var(--paper)"}}/></div>
        <button className="nhihh-btn nhihh-btn-primary" onClick={save}><Save size={14}/> Lưu thay đổi</button>
      </div>

      <div className="nhihh-card">
        <h3>Xem trước</h3>
        <div style={{background:"var(--paper)", border:"1px solid var(--paper-line)", borderRadius:10, padding:18}}>
          <div style={{width:36,height:36,borderRadius:9,background:form.logoColor,marginBottom:10}}/>
          <div className="display" style={{fontSize:19,fontWeight:600}}>{form.title || "Tên trang"}</div>
          <div style={{fontSize:12.5, color:"var(--text-muted)", marginBottom:14}}>{form.slogan || "Slogan"}</div>
          <div style={{fontSize:11, textTransform:"uppercase", letterSpacing:0.4, color:"var(--text-muted)", marginBottom:8}}>Hướng dẫn nhanh</div>
          {form.steps.map((s,i)=>(
            <div key={i} style={{display:"flex", gap:8, fontSize:12.5, marginBottom:6}}>
              <span style={{color:"var(--gold)", fontWeight:700}}>{i+1}.</span><span>{s || "…"}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- Shopee Page ----------------------------- */
function ShopeePage({settings,updateSettings}){
  const [editing,setEditing] = useState(false);
  const [idVal,setIdVal] = useState(settings.shopee.affiliateId);

  function save(){
    updateSettings({...settings, shopee:{...settings.shopee, affiliateId:idVal}}, "Đã cập nhật Affiliate ID");
    setEditing(false);
  }
  function copyId(){
    navigator.clipboard?.writeText(settings.shopee.affiliateId);
  }
  function toggleActive(v){
    updateSettings({...settings, shopee:{...settings.shopee, active:v}}, v ? "Đã bật kết nối Shopee" : "Đã tắt kết nối Shopee");
  }

  return (
    <div className="nhihh-card" style={{maxWidth:560}}>
      <h3>Định danh liên kết hiện tại</h3>
      {editing ? (
        <div style={{display:"flex", gap:8, marginBottom:14}}>
          <input className="nhihh-input mono" value={idVal} onChange={e=>setIdVal(e.target.value)}/>
          <button className="nhihh-btn nhihh-btn-primary nhihh-btn-sm" onClick={save}><Save size={13}/></button>
        </div>
      ) : (
        <div style={{display:"flex", alignItems:"center", gap:10, background:"var(--paper)", border:"1px solid var(--paper-line)", borderRadius:9, padding:"11px 14px", marginBottom:12}}>
          <span className="mono" style={{flex:1, fontSize:15}}>{settings.shopee.affiliateId}</span>
          <button className="nhihh-btn nhihh-btn-ghost nhihh-btn-sm" onClick={copyId}><Copy size={13}/></button>
          <button className="nhihh-btn nhihh-btn-ghost nhihh-btn-sm" onClick={()=>{setIdVal(settings.shopee.affiliateId); setEditing(true);}}><Pencil size={13}/></button>
        </div>
      )}

      <div style={{display:"flex", alignItems:"center", gap:10, marginBottom:20}}>
        <Toggle checked={settings.shopee.active} onChange={toggleActive}/>
        <Badge status={settings.shopee.active?"active":"paused"}/>
      </div>

      <div className="nhihh-note"><b>Thay đổi Affiliate ID?</b><br/>Bạn có thể cập nhật ID bất kỳ lúc nào. Hệ thống sẽ tự động gán ID mới cho tất cả link chuyển đổi sau đó.</div>
      <div className="nhihh-note"><b>Thời gian ghi nhận đơn?</b><br/>Shopee mất 24–48h để hiển thị đơn trên Dashboard. Đảm bảo ID đúng để không mất hoa hồng.</div>
    </div>
  );
}

/* ----------------------------- Config Page ----------------------------- */
function ConfigPage({settings,updateSettings}){
  const [form,setForm] = useState(settings.config);

  function save(){
    updateSettings({...settings, config:form}, "Đã lưu cấu hình hệ thống");
  }
  function backupNow(){
    const next = {...form, lastBackup:new Date().toISOString().slice(0,10)};
    setForm(next);
    updateSettings({...settings, config:next}, "Đã sao lưu dữ liệu");
  }

  return (
    <div className="nhihh-card" style={{maxWidth:560}}>
      <h3>Bảo trì</h3>
      <div style={{display:"flex", alignItems:"center", gap:10, marginBottom:22}}>
        <Toggle checked={form.maintenanceMode} onChange={v=>setForm({...form,maintenanceMode:v})}/>
        <span style={{fontSize:13.5}}>Bật chế độ bảo trì (khách hàng sẽ không thấy được form chuyển link)</span>
      </div>

      <h3>API / Link affiliate mặc định</h3>
      <div className="nhihh-field"><label>Domain affiliate</label><input className="nhihh-input mono" value={form.affiliateDomain} onChange={e=>setForm({...form,affiliateDomain:e.target.value})}/></div>

      <h3>Bảo mật trang quản trị</h3>
      <div className="nhihh-field"><label>Mã PIN đăng nhập quản trị</label><input className="nhihh-input mono" value={form.adminPin} onChange={e=>setForm({...form,adminPin:e.target.value})}/></div>

      <h3>Thông báo</h3>
      <div style={{display:"flex", alignItems:"center", gap:10, marginBottom:12}}>
        <Toggle checked={form.notifyNewUser} onChange={v=>setForm({...form,notifyNewUser:v})}/>
        <span style={{fontSize:13.5}}>Gửi thông báo khi có người dùng mới</span>
      </div>
      <div style={{display:"flex", alignItems:"center", gap:10, marginBottom:22}}>
        <Toggle checked={form.notifyConversion} onChange={v=>setForm({...form,notifyConversion:v})}/>
        <span style={{fontSize:13.5}}>Gửi thông báo khi có chuyển đổi</span>
      </div>

      <h3>Sao lưu</h3>
      <div style={{display:"flex", alignItems:"center", gap:12, marginBottom:22}}>
        <button className="nhihh-btn nhihh-btn-ghost" onClick={backupNow}><RotateCcw size={14}/> Sao lưu ngay</button>
        <span style={{fontSize:12.5, color:"var(--text-muted)"}}>Lần cuối: <span className="mono">{fmtDate(form.lastBackup)}</span></span>
      </div>

      <button className="nhihh-btn nhihh-btn-primary" onClick={save}><Save size={14}/> Lưu cấu hình</button>
    </div>
  );
}

/* ============================= SHARED DATA HOOK ============================= */
function useNhihhData(){
  const [loading,setLoading] = useState(true);
  const [users,setUsers] = useState([]);
  const [links,setLinks] = useState([]);
  const [commissions,setCommissions] = useState([]);
  const [settings,setSettings] = useState(null);
  const [toast,setToast] = useState(null);

  const showToast = useCallback((msg)=>{
    setToast(msg);
    setTimeout(()=>setToast(null), 2400);
  },[]);

  useEffect(()=>{
    (async()=>{
      try{
        let u,l,c,s;
        try{ u = await storageGet("nhihh-users"); if(!u) throw new Error("empty"); }
        catch(e){ u = seedUsers(); await storageSet("nhihh-users", u); }

        try{ l = await storageGet("nhihh-links"); if(!l) throw new Error("empty"); }
        catch(e){ l = seedLinks(u); await storageSet("nhihh-links", l); }

        try{ c = await storageGet("nhihh-commissions"); if(!c) throw new Error("empty"); }
        catch(e){ c = seedCommissions(u); await storageSet("nhihh-commissions", c); }

        try{ s = await storageGet("nhihh-settings"); if(!s) throw new Error("empty"); }
        catch(e){ s = seedSettings(); await storageSet("nhihh-settings", s); }

        if(!s.config.adminPin) s.config.adminPin = "1907";

        setUsers(u); setLinks(l); setCommissions(c); setSettings(s);
      }catch(err){
        console.error(err);
        setUsers(seedUsers()); setLinks([]); setCommissions([]); setSettings(seedSettings());
      }
      setLoading(false);
    })();
  },[]);

  async function persist(key,value){
    try{ await storageSet(key, value); }
    catch(e){ showToast("Lỗi lưu dữ liệu, vui lòng thử lại"); }
  }

  function updateUsers(next, msg){
    setUsers(next); persist("nhihh-users", next); if(msg) showToast(msg);
  }
  function updateLinks(next, msg){
    setLinks(next); persist("nhihh-links", next); if(msg) showToast(msg);
  }
  function updateCommissions(next, msg){
    setCommissions(next); persist("nhihh-commissions", next); if(msg) showToast(msg);
  }
  function updateSettings(next, msg){
    setSettings(next); persist("nhihh-settings", next); if(msg) showToast(msg);
  }

  return {loading, users, links, commissions, settings, toast, showToast, updateUsers, updateLinks, updateCommissions, updateSettings};
}

function LoadingScreen(){
  return (
    <div className="nhihh-root" style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
      <style>{STYLE}</style>
      <div style={{color:"var(--text-muted)", fontFamily:"IBM Plex Sans, sans-serif"}}>Đang tải dữ liệu…</div>
    </div>
  );
}

/* ============================= CUSTOMER APP (route: /) ============================= */
export function CustomerApp(){
  const router = useRouter();
  const {loading, users, links, settings, toast, updateUsers, updateLinks} = useNhihhData();

  if(loading || !settings) return <LoadingScreen/>;

  return (
    <>
      <CustomerPage
        settings={settings} links={links} users={users}
        updateLinks={updateLinks} updateUsers={updateUsers}
        goAdmin={()=>router.push("/admin")}
      />
      {toast && <div className="nhihh-toast"><Check size={15}/> {toast}</div>}
    </>
  );
}

/* ============================= ADMIN APP (route: /admin) ============================= */
export function AdminApp(){
  const router = useRouter();
  const [unlocked,setUnlocked] = useState(false);
  const {loading, users, links, commissions, settings, toast, showToast, updateUsers, updateLinks, updateCommissions, updateSettings} = useNhihhData();

  if(loading || !settings) return <LoadingScreen/>;

  if(!unlocked){
    return (
      <>
        <AdminLock correctPin={settings.config.adminPin||"1907"} onSuccess={()=>setUnlocked(true)} onBack={()=>router.push("/")}/>
        {toast && <div className="nhihh-toast"><Check size={15}/> {toast}</div>}
      </>
    );
  }

  return (
    <>
      <AdminPanel
        users={users} links={links} commissions={commissions} settings={settings}
        updateUsers={updateUsers} updateLinks={updateLinks} updateCommissions={updateCommissions} updateSettings={updateSettings}
        showToast={showToast}
        goCustomer={()=>router.push("/")}
        onLogout={()=>{ setUnlocked(false); router.push("/"); }}
      />
      {toast && <div className="nhihh-toast"><Check size={15}/> {toast}</div>}
    </>
  );
}
