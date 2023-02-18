import { BrowserRouter, Route, Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link to={"/1ZC3T1"}>1ZC3 Test 1</Link>
        </li>
        <li>
          <Link to={"/1ZB3T1"}>1ZB3 Test 1</Link>
        </li>
      </ul>
    </nav>
  );
}
