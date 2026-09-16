
type Cardprop={
    children: React.ReactNode
    title?: string;
};

function Card({title,children}:Cardprop){
    return(
<div className="rounded-xl bg-white p-6 shadow">
    <h2>{title}</h2>
    {children}
</div>

    )
}
export default Card;