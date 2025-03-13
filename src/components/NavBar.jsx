export default function NavBar() {
    return (
     <div className="navbar shadow-sm bg-[#191638]" >
     <div className="navbar-start  ">
       <div className="dropdown">
         <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
         </div>
       </div>
       <a className="btn btn-ghost text-xl">daisyUI</a>
     </div>
     <div className="navbar-center flex">
       <ul className="menu menu-horizontal px-1 m-auto">
         <li><a>Item 1</a></li>
         <li><a>Item 3</a></li>
       </ul>
     </div>
     <div className="navbar-end ">
       <a className="btn">Button</a>
     </div>
   </div>
    );
 }