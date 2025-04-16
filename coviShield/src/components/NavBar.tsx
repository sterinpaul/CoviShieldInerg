import { Header } from "antd/es/layout/layout";

export function NavBar() {

    return (
        <Header
            style={{
                position: 'sticky',
                top: 0,
                zIndex: 100,
                width: '100vw',
                height: '5rem',
                display: 'flex',
                alignItems: 'center',
                overflow: 'clip',
                backgroundImage: 'linear-gradient(45deg, blue,lightblue)'
            }}
        >
            <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <span className="h-12 w-12">
                        <img src="/covid.png" alt="Logo" />
                    </span>
                    <p className="font-bold text-fuchsia-50 text-4xl text-shadow-2xs text-shadow-emerald-800">India COVID-19</p>
                </div>
                <h1 className="lg:text-9xl tracking-widest font-extrabold bg-gradient-to-r from-blue-300 to-blue-400 bg-clip-text text-transparent h-50 w-auto text-nowrap">COVID</h1>
            </div>
            
        </Header>
    );
}