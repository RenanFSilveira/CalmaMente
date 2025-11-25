import AppointmentPage from '@/components/Consultas'
import SideBar from '@/components/SideBar'

export default function Calendario() {
    return(
        <main className='flex-row'>
            <SideBar pagina='/calendario'/>
            <AppointmentPage />
        </main>
    )
}

