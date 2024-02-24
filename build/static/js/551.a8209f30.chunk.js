"use strict";(self.webpackChunkreact_complete_guide=self.webpackChunkreact_complete_guide||[]).push([[551],{4551:(e,t,a)=>{a.r(t),a.d(t,{default:()=>x});var l=a(2791),n=a(5211),s=a(9434),c=a(9081);const r={"m-t-1":"PrintPreview_m-t-1__6xhFe","p-1":"PrintPreview_p-1__51+d6","small-button":"PrintPreview_small-button__1vj-n",actions:"PrintPreview_actions__bsbeE","button--alt":"PrintPreview_button--alt__sRTNz",button:"PrintPreview_button__uuKgh",default_button:"PrintPreview_default_button__4Rpt6",heading:"PrintPreview_heading__431ai",login:"PrintPreview_login__iEy7q",control:"PrintPreview_control__20dSq",invalid:"PrintPreview_invalid__USnwa",bump:"PrintPreview_bump__lXdFJ",divider:"PrintPreview_divider__9aMQi",valid:"PrintPreview_valid__xiK+1",error:"PrintPreview_error__MJsvq","actions-right":"PrintPreview_actions-right__tK1mA","login-for":"PrintPreview_login-for__offyS",cursor:"PrintPreview_cursor__ra5FT","control-label":"PrintPreview_control-label__5wmXV","print-value":"PrintPreview_print-value__+69Uz",bar:"PrintPreview_bar__lxJvh","bar-after":"PrintPreview_bar-after__lR8QN","down-space":"PrintPreview_down-space__50rde"};var i=a(5829),o=(a(9082),a(4596),a(6211)),d=a(2426),m=a.n(d),h=a(184);const v=e=>{(0,s.I0)();(0,l.useEffect)((()=>{}),[]);const t=(0,h.jsxs)("div",{className:"".concat(r.actions," ").concat(r["m-t-1"]),children:[(0,h.jsx)("button",{className:r.default,type:"button",onClick:e.onClose,children:"Close"}),(0,h.jsx)("button",{className:r.button,type:"button",onClick:()=>{var t=document.getElementById("printable").innerHTML,a=window.open("","","toolbar=yes,location=no,directories=yes,menubar=yes,scrollbars=yes,width=650, height=600, left=100, top=25");a.document.open(),a.document.write('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"'),a.document.write('"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">'),a.document.write('<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">'),a.document.write("<head><title>".concat(e.previewData.invoiceNo,"</title>")),a.document.write('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">'),a.document.write('<style type="text/css">body{ margin:0px;'),a.document.write("font-family:verdana,Arial;color:#000;"),a.document.write("font-family:Verdana, Geneva, sans-serif; font-size:12px;}.table-row {\n        border-bottom: 1px solid #adacac;\n      }\n      .custom-table tr{\n        td, th {\n          padding: 1rem 1rem;\n        }\n      }\n      .print-value {\n        font-weight: 600;\n        font-family: Arial, Helvetica, sans-serif;\n      }\n      .bar {\n        border-bottom: 1px solid #000;\n        padding: 0.75rem 0;\n      }\n      .bar-after {\n        padding-top: 0.75rem;\n      }\n      .down-space {\n        margin-bottom: 0.5rem;\n      }\n      .col, .col-6 {\n        text-align: left;\n      }\n      .row {\n        padding: 2rem;\n      }"),a.document.write("a{color:#000;text-decoration:none;} </style>"),a.document.write('</head><body onLoad="self.print()"><center>'),a.document.write(t),a.document.write("</center></body></html>"),a.document.close(),a.focus()},children:"Print"})]}),a=(0,h.jsxs)(l.Fragment,{children:[(0,h.jsx)("h3",{className:r.heading,children:"Invoice Details"}),(0,h.jsx)("div",{className:"card ".concat(r["m-t-1"]),id:"printable",children:(0,h.jsxs)("div",{className:" ".concat(r["p-1"]," card-body"),children:[(0,h.jsxs)("div",{className:"row",children:[(0,h.jsxs)("div",{className:"col-6 ".concat(r["down-space"]," down-space"),children:[(0,h.jsx)("label",{className:"".concat(r["control-label"]),children:"Invoice Number"}),(0,h.jsx)("div",{className:"print-value",children:e.previewData.invoiceNo})]}),(0,h.jsxs)("div",{className:"col-6 ".concat(r["down-space"]," down-space"),children:[(0,h.jsx)("label",{className:"".concat(r["control-label"]),children:"Invoice Date"}),(0,h.jsx)("div",{className:"print-value",children:m()(e.previewData.createdAt).format("LLLL")})]}),(0,h.jsxs)("div",{className:"col-6 ".concat(r["down-space"]," down-space"),children:[(0,h.jsx)("label",{className:"".concat(r["control-label"]),children:"Type"}),(0,h.jsx)("div",{className:"print-value",children:e.previewData.type})]}),(0,h.jsxs)("div",{className:"col-6 ".concat(r["down-space"]," down-space"),children:[(0,h.jsx)("label",{className:"".concat(r["control-label"]),children:"Net Leaf KGs"}),(0,h.jsx)("div",{className:"print-value",children:e.previewData.netLeafKgs})]}),(0,h.jsxs)("div",{className:"col-6 ".concat(r["down-space"]," down-space"),children:[(0,h.jsx)("label",{className:"".concat(r["control-label"]),children:"Rate/KG"}),(0,h.jsx)("div",{className:"print-value",children:e.previewData.rateKg})]}),(0,h.jsxs)("div",{className:"col-6 ".concat(r["down-space"]," down-space"),children:[(0,h.jsx)("label",{className:"".concat(r["control-label"]),children:"Qlty"}),(0,h.jsx)("div",{className:"print-value",children:e.previewData.qlty})]}),(0,h.jsxs)("div",{className:"col-6 ".concat(r["down-space"]," down-space"),children:[(0,h.jsx)("label",{className:"".concat(r["control-label"]),children:"CL No"}),(0,h.jsx)("div",{className:"print-value",children:e.previewData.clNo})]}),(0,h.jsxs)("div",{className:"col-6 ".concat(r["down-space"]," down-space"),children:[(0,h.jsx)("label",{className:"".concat(r["control-label"]),children:"VCH No"}),(0,h.jsx)("div",{className:"print-value",children:e.previewData.vchNo})]}),(0,h.jsxs)("div",{className:"col-6 ".concat(r["down-space"]," down-space"),children:[(0,h.jsx)("label",{className:"".concat(r["control-label"]),children:"Note"}),(0,h.jsx)("div",{className:"print-value",children:e.previewData.note})]})]}),(0,h.jsx)("div",{className:"".concat(r.bar," bar")}),(0,h.jsxs)("div",{className:"".concat(r["bar-after"]," bar-after row"),children:[(0,h.jsxs)("div",{className:"col-6 ".concat(r["down-space"]," down-space"),children:[(0,h.jsx)("label",{className:"".concat(r["control-label"]),children:"Customer Name"}),(0,h.jsx)("div",{className:"print-value",children:e.previewData.customerId.name})]}),(0,h.jsxs)("div",{className:"col-6 ".concat(r["down-space"]," down-space"),children:[(0,h.jsx)("label",{className:"".concat(r["control-label"]),children:"Customer Mobile"}),(0,h.jsx)("div",{className:"print-value",children:e.previewData.customerId.mobile})]}),(0,h.jsxs)("div",{className:"col-6 ".concat(r["down-space"]," down-space"),children:[(0,h.jsx)("label",{className:"".concat(r["control-label"]),children:"Customer Address"}),(0,h.jsx)("div",{className:"print-value",children:e.previewData.customerId.address})]})]})]})}),t]});return(0,h.jsx)(i.Z,{onClose:e.onClose,big:!0,children:a})};var w=a(2625),u=a(1442);const b={"m-t-1":"BillPreview_m-t-1__r3dkZ","p-1":"BillPreview_p-1__rsvPQ","p-2":"BillPreview_p-2__zNTBS","text-right":"BillPreview_text-right__QXcJp","table-row":"BillPreview_table-row__ftglb","custom-table":"BillPreview_custom-table__pC5vM","small-button":"BillPreview_small-button__Fbt8W",actions:"BillPreview_actions__BzXsj","button--alt":"BillPreview_button--alt__945To",button:"BillPreview_button__surTK",default_button:"BillPreview_default_button__ijgDG",heading:"BillPreview_heading__PkOv6",login:"BillPreview_login__RV2Ak",control:"BillPreview_control__Zm9pB",invalid:"BillPreview_invalid__md4d3",bump:"BillPreview_bump__TPVoi",divider:"BillPreview_divider__CwQdt",valid:"BillPreview_valid__G-moe",error:"BillPreview_error__grpHg","actions-right":"BillPreview_actions-right__doZfW","login-for":"BillPreview_login-for__HaXxA",cursor:"BillPreview_cursor__1UDp2","control-label":"BillPreview_control-label__y7Qyl","print-value":"BillPreview_print-value__CKKLB",bar:"BillPreview_bar__oHoMR","bar-after":"BillPreview_bar-after__gHlM2","down-space":"BillPreview_down-space__czV95"},p=e=>{(0,s.I0)();(0,l.useEffect)((()=>{}),[]);const t=(0,h.jsxs)("div",{className:"".concat(b.actions," ").concat(b["m-t-1"]),children:[(0,h.jsx)("button",{className:b.default,type:"button",onClick:e.onClose,children:"Close"}),(0,h.jsx)("button",{className:b.button,type:"button",onClick:()=>{var t=document.getElementById("printable").innerHTML,a=window.open("","","toolbar=yes,location=no,directories=yes,menubar=yes,scrollbars=yes,width=650, height=600, left=100, top=25");a.document.open(),a.document.write('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"'),a.document.write('"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">'),a.document.write('<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">'),a.document.write("<head><title>".concat(e.title,"</title>")),a.document.write('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">'),a.document.write('<style type="text/css">body{ margin:0px;'),a.document.write("font-family:verdana,Arial;color:#000;"),a.document.write("font-family:Verdana, Geneva, sans-serif; font-size:12px;}.table-row {\n        border-bottom: 1px solid #adacac;\n      }\n      .custom-table tr{\n        td, th {\n          padding: 1rem 1rem;\n        }\n      }\n      .print-value {\n        font-weight: 600;\n        font-family: Arial, Helvetica, sans-serif;\n      }\n      .bar {\n        border-bottom: 1px solid #000;\n        padding: 0.75rem 0;\n      }\n      .bar-after {\n        padding-top: 0.75rem;\n      }\n      .down-space {\n        margin-bottom: 0.5rem;\n      }\n      .col, .col-6 {\n        text-align: left;\n      }\n      .row {\n        padding: 2rem;\n      }"),a.document.write("a{color:#000;text-decoration:none;} </style>"),a.document.write('</head><body onLoad="self.print()"><center>'),a.document.write(t),a.document.write("</center></body></html>"),a.document.close(),a.focus()},children:"Print"})]}),a=e.billingData.reduce(((e,t)=>parseFloat(t.creditAmount)+e),0),n=(0,h.jsxs)(l.Fragment,{children:[(0,h.jsx)("h3",{className:b.heading,children:"Bill Details"}),(0,h.jsx)("div",{className:"card ".concat(b["m-t-1"]),id:"printable",children:(0,h.jsxs)("div",{className:" ".concat(b["p-2"]," card-body"),children:[(0,h.jsxs)("div",{className:"row",children:[(0,h.jsxs)("div",{className:"col-6 ".concat(b["down-space"]),children:[(0,h.jsx)("label",{className:"".concat(b["control-label"]),children:"Seller Details"}),(0,h.jsx)("div",{className:"print-value",children:"DEMO Name"}),(0,h.jsx)("div",{className:"print-value",children:"DEMO Address"}),(0,h.jsx)("div",{className:"print-value",children:"test@example.com"}),(0,h.jsx)("div",{className:"print-value",children:"0000000"})]}),(0,h.jsxs)("div",{className:"col-6 ".concat(b["down-space"]),children:[(0,h.jsx)("label",{className:"".concat(b["control-label"]),children:"Customer Details"}),"string"===typeof e.customer&&(0,h.jsx)("div",{className:"print-value",children:e.customer})]}),(0,h.jsxs)("div",{className:"col ".concat(b["down-space"]),children:[(0,h.jsx)("label",{className:"".concat(b["control-label"]),children:"Bill Date"}),(0,h.jsx)("div",{className:"print-value",children:m()().format("DD-MM-YYYY hh:mm A")})]})]}),(0,h.jsx)("div",{className:"".concat(b.bar," bar")}),(0,h.jsx)("div",{className:"".concat(b["bar-after"]," bar-after row"),children:(0,h.jsxs)("table",{className:"".concat(b["custom-table"]," custom-table"),children:[(0,h.jsx)("thead",{children:(0,h.jsxs)("tr",{className:"".concat(b["table-row"]," table-row"),children:[(0,h.jsx)("th",{children:"DATE"}),(0,h.jsx)("th",{children:"VCH"}),(0,h.jsx)("th",{children:"CL NO"}),(0,h.jsx)("th",{children:"%"}),(0,h.jsx)("th",{children:"QUANTITY"}),(0,h.jsx)("th",{children:"RATE"}),(0,h.jsx)("th",{children:"Amount"}),(0,h.jsx)("th",{children:"P"})]})}),(0,h.jsxs)("tbody",{children:[e.billingData&&e.billingData.length&&e.billingData.map(((e,t)=>(0,h.jsxs)("tr",{className:"".concat(b["table-row"]," table-row"),children:[(0,h.jsx)("td",{children:m()(e.createdAt).format("DD/MM/YYYY")}),(0,h.jsx)("td",{children:e.vchNo}),(0,h.jsx)("td",{children:e.clNo}),(0,h.jsx)("td",{children:e.qlty}),(0,h.jsx)("td",{children:e.netLeafKgs}),(0,h.jsx)("td",{children:e.rateKg}),(0,h.jsx)("td",{children:e.creditAmount}),(0,h.jsx)("td",{children:e.note})]},t))),(0,h.jsxs)("tr",{className:"".concat(b["table-row"]," table-row"),children:[(0,h.jsx)("th",{}),(0,h.jsx)("th",{}),(0,h.jsx)("th",{}),(0,h.jsx)("th",{}),(0,h.jsx)("th",{children:"Total Amount"}),(0,h.jsx)("th",{}),(0,h.jsx)("th",{children:a}),(0,h.jsx)("th",{})]})]})]})})]})}),t]});return(0,h.jsx)(i.Z,{onClose:e.onClose,big:!0,children:n})};function x(){const e=(0,s.v9)(c.kh),[t,a]=(0,l.useState)([]),r=(0,s.v9)(c.xw),[i,d]=(0,l.useState)(!1),[b,x]=(0,l.useState)(!1),[_,j]=(0,l.useState)({}),[N,f]=(0,l.useState)(),[P,g]=(0,l.useState)(),[y,D]=(0,l.useState)(),C=(0,s.v9)(o.IV),B=(0,s.v9)(c.Mg),[M,Y]=(0,l.useState)(!1),[T,L]=(0,l.useState)(""),S=(0,s.I0)();(0,l.useEffect)((()=>{(async()=>{})(),S((0,c.G7)())}),[]);const A=async()=>{f(),g(),D(),x(!1),await S((0,c.G7)())},k=(0,h.jsx)("div",{className:"card-body search-body",children:(0,h.jsxs)("div",{className:"row",children:[(0,h.jsxs)("div",{className:"col-md-5",children:[(0,h.jsx)(w.f,{value:N,onChange:e=>f(e.value),dateFormat:"dd/mm/yy",placeholder:"Select a Date",showIcon:!0}),(0,h.jsx)("label",{className:"space-both",children:"To"}),(0,h.jsx)(w.f,{value:P,onChange:e=>g(e.value),minDate:N,dateFormat:"dd/mm/yy",placeholder:"Select a Date",showIcon:!0,disabled:!N})]}),(0,h.jsxs)("div",{className:"col-md-3",children:[(0,h.jsx)("label",{htmlFor:"customer",children:"Customer"}),(0,h.jsx)(u.L,{placeholder:"Select a Customer",filter:!0,showClear:!0,className:"w-full md:w-14rem",optionLabel:"name",value:y,onChange:e=>{D(e.value)},valueTemplate:(e,t)=>e?(0,h.jsxs)("div",{children:[e.name," (",e.mobile,")"]}):(0,h.jsx)("span",{children:t.placeholder}),itemTemplate:e=>(0,h.jsxs)("div",{children:[e.name," (",e.mobile,")"]}),options:C,style:{flex:"3.1 1"}})]}),(0,h.jsxs)("div",{className:"col-md-3",style:{float:"left"},children:[(0,h.jsx)("button",{type:"button",className:"p-button p-button-success p-button-rounded",onClick:async()=>{await S((0,c.G7)({from:N?m()(N).format("YYYY-MM-DD"):"",to:P?m()(P).format("YYYY-MM-DD"):"",customer:y})),r.length&&(x(!0),S(c.zk.getBillingItems()))},children:"Search Record"}),(0,h.jsx)("i",{className:"pi pi-replay",onClick:A,style:{fontSize:"2rem",margin:"8px",cursor:"pointer"}}),b&&(0,h.jsx)("button",{type:"button",className:"p-button p-button-rounded",onClick:()=>{document.body.classList.add("hidden-overflow"),Y(!0),L(y?"".concat(m()(N).format("YYYY-MM-DD")," - ").concat(m()(P).format("YYYY-MM-DD")," | ").concat(y.name):"".concat(m()(N).format("YYYY-MM-DD")," - ").concat(m()(P).format("YYYY-MM-DD"))),A()},children:"Create Bill"})]})]})});return(0,h.jsx)(l.Fragment,{children:(0,h.jsxs)("div",{className:"card overlay",children:[(0,h.jsx)("div",{className:"card-header text-white",children:"Order List"}),i&&(0,h.jsx)(v,{onClose:()=>{d(!1),j({}),document.body.classList.remove("hidden-overflow")},previewData:_}),k,M&&(0,h.jsx)(p,{onClose:()=>{Y(!1),document.body.classList.remove("hidden-overflow")},billingData:B,customer:null!==y&&void 0!==y?y:"Customer not Selected when bill created",title:T}),(0,h.jsx)(n.Z,{data:r,columns:e,buttons:[{button:"xlsx",option:!0}],filter:"row",viewDetails:(e,t)=>{console.log(e),d(!0),j(e),document.body.classList.add("hidden-overflow")}})]})})}}}]);
//# sourceMappingURL=551.a8209f30.chunk.js.map