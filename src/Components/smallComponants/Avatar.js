export default function Avatar({size}) {
    let width = 'w-12';
    if(size === 'big'){
        width = 'w-24'
    }
    return (
        <div className={`${width} rounded-full overflow-hidden `}>
            <img alt="" src="https://img.freepik.com/free-vector/creative-nerd-logo-template_23-2149218771.jpg?size=338&ext=jpg&ga=GA1.2.834377962.1677310050&semt=ais"/>
        </div>
    )
}