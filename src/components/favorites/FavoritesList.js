import FavoriteItem from "./FavoriteItem";
import "./favoritesList.css"
const FavoritesList =(props)=>{
    const favList = [
        {
          id: "123",
          businessName: "Business Name1",
          serviceName:"hair salon",
          businessDescription: "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
          tel: "+9720541245678",
          address: "somewhere around the world",
          email: "mail@gmail.com",
        },
        {
          id: "456",
          businessName: "Business Name2",
          serviceName:"nail salon",

          businessDescription: "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
          tel: "+9720541245678",
          address: "somewhere around the world",
          email: "mail@gmail.com",
        },
      ]

return(
    <div class="d-flex justify-content-center mt-4">
      <ul className="border list-group list-group-flush">
      <p class="d-flex justify-content-center m-1">Favorites</p>

        {favList.map((item) => (
          <FavoriteItem
            key={item.id}
            name={item.businessName}
            service={item.serviceName}
          />
        ))}
      </ul>
    </div>
  );

}
export default FavoritesList;