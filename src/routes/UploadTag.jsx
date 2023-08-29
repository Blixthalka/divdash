import moment from 'moment/moment';
import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../App';
import Card from '../components/Card';
import NoData from '../components/NoData';

const UploadTag = () => {
    const [uploading, setUploading] = useState(false);
    const [text, setText] = useState([]);
    const { setDividends } = useContext(AppContext)
    const navigate = useNavigate();
    let params = useParams();

    let desc = ""

    if (params.tag === "avanza") {
        desc = "Min Ekonomi / Transaktioner / Datum / Exportera Transaktioner"
    } else if (params.tag === "nordnet") {
        desc = "Transaktioner och notor / Datum / Exportera CSV"
    } else {
        return (
            <Card>
                <NoData />
            </Card>
        )
    }

    const uploadFile = (file) => {
        setUploading(true)
        const input = file;
        const reader = new FileReader();
        reader.onload = function (e) {
            const fileText = e.target.result;
            const parsed = fileText.split('\n')
                .map(row => row.split(';'))
                .filter(row => row[2] === 'Utdelning')
                .map(row => {
                    return {
                        date: moment(row[0], "YYYY-MM-DD"),
                        name: row[3],
                        quantity: parseFloat(row[4]),
                        dividend: parseFloat(row[5]),
                        amount: parseFloat(row[6]),
                        isin: row[9],
                        tag: params.tag
                    }
                })

            setDividends(parsed)
            setText(parsed);
            setUploading(false)
        };
        reader.readAsText(input);
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <div className="grid gap-5">
            <Card title={`Download file @ ${capitalizeFirstLetter(params.tag)} -> ${desc}`} >


                {uploading ?
                    <div className='flex justify-center'>
                        <svg role="status" class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-primary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path>
                        </svg>
                    </div> :

                    <div>
                        <label className="mt-2 border border-dashed border-slate-200 p-10 relative flex justify-center cursor-pointer hover:bg-slate-50 group">
                            <input id="upload-file" type="file" onChange={(event) => {
                                uploadFile(event.target.files[0])
                                setTimeout(() => {
                                    navigate("/dashboard")
                                }, 500);
                            }} />
                            <p className="text-sm text-secondary group-hover:text-primary">Browse</p>
                        </label>
                    </div>}
            </Card>


        </div>
    );
}

export default UploadTag;
