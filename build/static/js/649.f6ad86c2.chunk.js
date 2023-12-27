"use strict";(self.webpackChunkreact_complete_guide=self.webpackChunkreact_complete_guide||[]).push([[649],{4649:function(e,n,t){t.r(n),t.d(n,{default:function(){return R}});var r=t(4165),a=t(5861),c=t(2791),s="ServicesSummary_summary__flhDZ",i=t(184),o=function(){return(0,i.jsxs)("section",{className:s,children:[(0,i.jsx)("h2",{children:"Excellent Service, Delivered To the Customer"}),(0,i.jsx)("p",{children:"Connect the customer's car with us and get a better solution from others."}),(0,i.jsx)("p",{children:"All our service are done by experienced engineer to deliver an excellent service to the customer. with cheap rate from others."})]})},l=t(9439),u="AvailableServices_meals__E5j3k",d="AvailableServices_mealLoading__hDySv",m="AvailableServices_mealLoadingError__oHzxG",h="Card_card__9h8Dh",f=function(e){return(0,i.jsx)("div",{className:h,children:e.children})},v=t(9434),x=t(3359),p="PartsItem_meal__vzZEa",_="PartsItem_description__S2G7F",j="PartsItem_price__cdcKE",g="PartsItem_inCart__GRoau",S="PartsItem_meal--highlight__4vsqz",k="PartsItem_item--lowstock__JsELI",I="PartsItem_highlight__ndhH3",b="PartsItemForm_form__bLPxA",N=t(1413),Z="Input_input__+xIWo",w=c.forwardRef((function(e,n){return(0,i.jsxs)("div",{className:Z,children:[(0,i.jsx)("label",{htmlFor:e.input.id,children:e.label}),(0,i.jsx)("input",(0,N.Z)({id:e.input.id,ref:n},e.input))]})})),C=function(e){var n=(0,c.useState)(!0),t=(0,l.Z)(n,2),r=t[0],a=t[1],s=(0,c.useRef)(),o=(0,i.jsxs)(c.Fragment,{children:[e.canSell&&(0,i.jsx)("button",{children:"+ Add"}),!e.canSell&&(0,i.jsx)("button",{type:"button",disabled:!0,children:"+ Add"})]});return(0,i.jsxs)("form",{className:b,onSubmit:function(n){n.preventDefault();var t=s.current.value,r=+t;0===t.trim().length||r<1||r>5?a(!1):e.onAddToCart(r)},children:[(0,i.jsx)(w,{label:"No(s)",ref:s,input:{id:"amount",type:"number",min:"1",max:"".concat(e.stock),step:"1",defaultValue:"1"}}),o,!r&&(0,i.jsx)("p",{children:"Please enter a valid amount(1-5)"})]})},y=function(e){var n="\u20b9".concat(e.price.toFixed(2)),t=(0,v.I0)(),c=(0,v.v9)(x.tQ),s=function(){var n=(0,a.Z)((0,r.Z)().mark((function n(a){var s,i,o;return(0,r.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(s=!1,(i=c.find((function(n){return n.id===e.id})))?i.amount+a<=e.stock&&(s=!0):s=!0,!s){n.next=7;break}return o={id:e.id,name:e.name,amount:a,price:e.price},n.next=7,t(x.Uw.addToCart({item:o}));case 7:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}(),o="".concat(p," ").concat(e.inCart.amount>0?S:""," ").concat(e.stock<1?k:"");return console.log("props",e),(0,i.jsxs)("li",{className:o,children:[(0,i.jsxs)("div",{children:[(0,i.jsx)("h3",{children:e.name}),(0,i.jsxs)("div",{className:_,children:["Code: ",e.code]}),(0,i.jsxs)("div",{className:_,children:["Part No: ",e.partNo]}),(0,i.jsxs)("div",{className:_,children:["Available: ",e.stock]}),e.location&&(0,i.jsxs)("div",{className:I,children:["Find Area: ",e.location]}),(0,i.jsx)("div",{className:j,children:n})]}),(0,i.jsxs)("div",{children:[(0,i.jsx)(C,{stock:e.stock,onAddToCart:s,canSell:e.canSell}),e.inCart.amount>0&&(0,i.jsxs)("span",{className:g,children:["x ",e.inCart.amount]})]})]},e.id)},A="SearchForm_text--input__8BRG+",P=function(e){var n=(0,c.useRef)();return(0,i.jsx)("form",{onSubmit:function(t){t.preventDefault();var r=n.current.value;e.search(r)},children:(0,i.jsx)("input",{className:A,onKeyUp:function(n){e.search(n.target.value)},ref:n,placeholder:"Search Items..."})})},E=t(9082),F=function(){var e=(0,v.v9)(E.Nx),n=(0,v.I0)(),t=(0,c.useState)(!1),r=(0,l.Z)(t,2),a=r[0],s=(r[1],(0,c.useState)()),o=(0,l.Z)(s,2),h=o[0],p=(o[1],(0,v.v9)(x.tQ));if((0,c.useEffect)((function(){console.log("all items",e)}),[]),a)return(0,i.jsx)("section",{className:d,children:(0,i.jsx)("h1",{children:"Loading..."})});if(h)return(0,i.jsx)("section",{className:m,children:(0,i.jsx)("h1",{children:h})});var _=function(e){return p.find((function(n){return n.id===e.id}))||{amount:0}},j=function(e){var n=p.find((function(n){return n.id===e.id}));return!n||e.stock>n.amount};console.log("items map",e);var g=e.map((function(e){return(0,i.jsx)(y,{id:e.id,code:e.code,name:e.name,stock:e.stock,partNo:e.part_no,price:e.price,location:e.location,canSell:e.canSell&&j(e),inCart:_(e)},e.id)}));return(0,i.jsx)("section",{className:u,children:(0,i.jsxs)(f,{children:[(0,i.jsx)(P,{search:function(e){n(E.o8.searchItems(e))}}),(0,i.jsx)("ul",{children:g})]})})},D=t(9965),L=function(e){var n=(0,v.v9)(D.r),t=(0,v.I0)(),s=(0,v.v9)(D.jl),l=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t((0,E.Ez)({token:n}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return(0,c.useEffect)((function(){console.log("token->",n),l()}),[n]),(0,i.jsxs)(c.Fragment,{children:[(0,i.jsx)(o,{}),s&&(0,i.jsx)(F,{})]})};var R=function(){var e=(0,v.v9)(D.jl),n=(0,v.I0)(),t=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n(D.YV.resetAuth());case 2:return e.next=4,n(x.Uw.resetCart());case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),s=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,localStorage.removeItem("loggedIn"),localStorage.removeItem("token"),localStorage.removeItem("type"),void localStorage.clear();case 2:return e.next=4,t();case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return(0,i.jsx)(c.Fragment,{children:e&&(0,i.jsx)(L,{onLogout:s})})}}}]);
//# sourceMappingURL=649.f6ad86c2.chunk.js.map