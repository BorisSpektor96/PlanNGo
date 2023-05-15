import { Fragment } from "react";
import styles from "./BusinessesMenu.module.css";
import "bootstrap/dist/css/bootstrap.css";
import SearchBar from '../forms/SearchBar';
import BusinessFormat from "./BusinessFormat";

const BusinessesMenu = () => {


  const listOfBusinesses = [
    {
      id: "123",
      businessName: "Business Name1",
      businessDescription: "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
      tel: "+9720541245678",
      address: "somewhere around the world",
      email: "mail@gmail.com",
    },
    {
      id: "123",
      businessName: "Business Name2",
      businessDescription: "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
      tel: "+9720541245678",
      address: "somewhere around the world",
      email: "mail@gmail.com",
    }
  ]

  const businessRenderList = listOfBusinesses.map(({ id, businessName, businessDescription, tel, email, address }) => (
    <BusinessFormat
      id={ id }
      businessName={ businessName }
      businessDescription={ businessDescription }
      tel={ tel }
      email={ email }
      address={ address }

    />
  ));

  return (
    <Fragment>
      <SearchBar />
      <div className='d-flex flex-column p-3'>

        {/* { theBusinessFormat } */ }
        { businessRenderList }

      </div>
    </Fragment>
  );

}

export default BusinessesMenu;