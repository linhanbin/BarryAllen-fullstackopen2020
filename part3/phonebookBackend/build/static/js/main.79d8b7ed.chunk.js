(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{15:function(e,t,n){e.exports=n(37)},37:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(14),c=n.n(r),u=n(2),i=function(e){var t=e.persons,n=Object(a.useState)([]),r=Object(u.a)(n,2),c=r[0],i=r[1];return o.a.createElement("div",null,o.a.createElement("p",null,"filter shown with ",o.a.createElement("input",{onChange:function(e){i(t.filter((function(t){return t.name.toLowerCase().includes(e.target.value.toLowerCase())})))}})),c.map((function(e){return o.a.createElement("p",{key:e.name},e.name," ",e.number)})))},l=n(4),s=n(3),m=n.n(s),d="http://localhost:3001/api/persons",f=function(){return m.a.get(d)},p=function(e){return m.a.post(d,e)},b=function(e){return m.a.delete("".concat(d,"/").concat(e))},h=function(e,t){return m.a.put("".concat(d,"/").concat(t),e)},E=function(e){var t=e.persons,n=e.setPersons,r=e.setNotification,c=Object(a.useState)(""),i=Object(u.a)(c,2),s=i[0],m=i[1],d=Object(a.useState)(""),f=Object(u.a)(d,2),b=f[0],E=f[1];return o.a.createElement("form",{onSubmit:function(e){e.preventDefault();var a={name:s,number:b},o=t.find((function(e){return e.name===s}));o&&window.alert("".concat(s," is already added to phonebook")),o?window.confirm("".concat(o.name," is already added to phonebook, replace the old number with a new one?"))&&(h(Object(l.a)(Object(l.a)({},o),{},{number:b}),o.id).then((function(e){n(t.map((function(t){return t.number!==b?t:e.data})))})),m(""),E(""),r({text:"Updated phone number of ".concat(o.name),type:"success"}),setTimeout((function(){return r(null)}),5e3)):p(a).then((function(e){n(t.concat(e.data)),m(""),E(""),r({text:"Added ".concat(a.name),type:"success"}),setTimeout((function(){return r(null)}),5e3)}))}},o.a.createElement("div",null,"name: ",o.a.createElement("input",{onChange:function(e){return m(e.target.value)},value:s})),o.a.createElement("div",null,"number: ",o.a.createElement("input",{onChange:function(e){return E(e.target.value)},value:b})),o.a.createElement("button",{type:"submit"},"add"))},v=function(e){var t=e.person,n=e.setPersons,a=e.setNotification;return o.a.createElement("div",null,o.a.createElement("p",null,t.name," ",t.number,o.a.createElement("button",{onClick:function(e){window.confirm("Delete ".concat(t.name,"?"))&&(b(t.id).then((function(){a({text:"Deleted ".concat(t.name," "),type:"success"})})).catch((function(e){a({text:"Information of ".concat(t.name," has already been removed from server"),type:"error"})})),f().then((function(e){n(e.data)})))}},"delete")))},g=function(e){var t=e.persons,n=e.setPersons,a=e.setNotification;return o.a.createElement("div",null,t.map((function(e){return o.a.createElement(v,{key:e.name,person:e,setPersons:n,setNotification:a})})))},y=function(e){var t,n=e.notification;return null===n?null:(t="success"===n.type?{color:"green",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10}:{color:"red",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10},o.a.createElement("div",{style:t},n.text))},w=function(){var e=Object(a.useState)([]),t=Object(u.a)(e,2),n=t[0],r=t[1],c=Object(a.useState)(null),l=Object(u.a)(c,2),s=l[0],m=l[1];return Object(a.useEffect)((function(){f().then((function(e){r(e.data)}))}),[]),o.a.createElement("div",null,o.a.createElement("h2",null,"Phonebook"),o.a.createElement(y,{notification:s}),o.a.createElement(i,{persons:n}),o.a.createElement("h3",null,"Add a new"),o.a.createElement(E,{persons:n,setPersons:r,setNotification:m}),o.a.createElement("h3",null,"Numbers"),o.a.createElement(g,{persons:n,setPersons:r,setNotification:m}))};c.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(w,null)),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.79d8b7ed.chunk.js.map