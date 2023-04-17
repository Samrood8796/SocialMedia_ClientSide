export default function Card ({children,noPadding}) {
    let classes = "bg-white rounded mb-5 "
        if(!noPadding){
             classes+="p-4"
        }
    return(
        <div className={classes}>
            {children}
        </div>  
    )
}