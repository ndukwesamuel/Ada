import { useAuth } from "../../../contexts/Auth";
import UserMenu from "../../components/layout/nav/UserMenu";
import { capitalizeWord } from "../../components/helpers";

export default function UserDashboard() {
  // context
  const {auth, setAuth} = useAuth();
  const roles = auth?.user?.roles
  const fname = auth && auth?.user?.name
  // const fullName = capitalizeWord(fname)
  // console.log(fname);
//   console.log(roles);
const arr = ["primary", "secondary", "success", "warning", "danger", "info"];

  return (
    <div className="">
      <h1 className="bg-success text-light my-4 p-3">Welcome back <b className=" text-warning">{`${auth?.user?.name.toUpperCase()}`}</b></h1>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-2 mb-2 h4 bg-light">User Information</div>

            <ul className="list-group">
              <li className="list-group-item"><b>Name: </b> {auth?.user?.name}</li>
              <li className="list-group-item"><b>Roles: </b>{roles?.map((role, i)=>{
                return   <span
                key={i}
                className={`badge text-light mx-2 bg-${arr[i % arr.length]}`}
              >
                {role}
              </span>
              })}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
