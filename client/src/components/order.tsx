import { observer } from 'mobx-react';
import React from 'react';

interface IProps {
    props: any
}

interface IState {
    parsedBag: []
}

@observer
export class OrderComponent extends React.Component<IProps, IState> {

    constructor( props: IProps ) {
        super( props );

    }
    
    render() {

        return <div>
            <h2>Данные отправки</h2>

        </div>
    }
}