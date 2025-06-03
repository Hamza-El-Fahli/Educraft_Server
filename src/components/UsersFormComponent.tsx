
export default function UsersFormComponent({UserForm,setUserForm,AddORMod,AddUser,modifyUser} : any){

    return  <form
  onSubmit={(e) => e.preventDefault()}
  className="flex flex-col gap-3 w-80 "
>
  <input
    required
    className="text-primary h-12 border p-3"
    type="text"
    placeholder="userName"
    name="userName"
    autoComplete="username"
    value={UserForm?.name}
    onChange={(e) => setUserForm({ ...UserForm, name: e.target.value })}
  />
  <input
    required
    className="text-primary h-12 border p-3"
    type="text"
    name="email"
    placeholder="Email"
    value={UserForm?.email}
    onChange={(e) => setUserForm({ ...UserForm, email: e.target.value })}
  />
  <input
    required
    className="text-primary h-12 border p-3"
    type="password"
    name="password"
    placeholder="password"
    autoComplete="current-password"
    value={UserForm?.password}
    onChange={(e) => setUserForm({ ...UserForm, password: e.target.value })}
  />
  
  <select className="m-1 border rounded-md p-2 text-black h-12 w-full" name="profile" value={UserForm?.profile} 
      onChange={(e) => setUserForm({ ...UserForm, profile: e.target.value })}

id="">
<option value="user" selected>utilisateur</option>
<option value="prof" >professeur</option>
<option value="admin" >administrateur</option>

</select>
  {UserForm?.profile == 'user' && <input
    required
    className="text-primary h-12 border p-3"
    type="number"
    name="annee"
    placeholder="Annee"
    value={UserForm?.annee}
    onChange={(e) => setUserForm({ ...UserForm, annee: parseInt(e.target.value) })}
  />}
  <input
    required
    className="text-primary h-12 border p-3"
    type="text"
    placeholder="filiere"
    name="filiere"
    value={UserForm?.filiere}
    onChange={(e) => setUserForm({ ...UserForm, filiere: e.target.value })}
  />
  <button 
              onClick={(e: any) => { (AddORMod) ? AddUser() : modifyUser() }}

  className="text-primary h-12 border p-3">
    Save
  </button>
</form>

    
}