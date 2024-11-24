import {
    ComponentRef,
    Injectable,
    ViewContainerRef
} from "@angular/core";
import {PopupComponent} from "../../components/popup/popup.component";

@Injectable({providedIn: 'root'})
export class PopupService {
    protected popupComponent!: ComponentRef<PopupComponent>;
    protected viewContainerRef!: ViewContainerRef;


    public init(viewContainer: ViewContainerRef) {
        this.viewContainerRef = viewContainer;
    }

    public showPopupNewTask() {
        this.viewContainerRef.createComponent<PopupComponent>(PopupComponent);

        setTimeout(() => {
            this.viewContainerRef.clear();
        }, 3000)
    }
}
