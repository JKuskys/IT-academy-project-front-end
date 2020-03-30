import { Component, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { Application } from "../shared/application";
import { Comment } from "../shared/comment";
import { ActivatedRoute } from "@angular/router";
import { ApplicationService } from "../services/application/application.service";
import { CommentService } from "../services/application/comment.service";
import { JwtHelper } from "../services/universal/JwtHelper.service";
import { isNotNullOrUndefined } from "codelyzer/util/isNotNullOrUndefined";

@Component({
    selector: "app-student-page",
    templateUrl: "./student-page.component.html",
    styleUrls: ["./student-page.component.scss"]
})
export class StudentPageComponent implements OnInit {
    isLoading = false;
    declined = "ATMESTA";
    accepted = "PRIIMTA";
    private routeSub: Subscription;
    public application: Application;
    comments: Comment[];
    public currentStatus?: string;

    constructor(
        private route: ActivatedRoute,
        private applicationService: ApplicationService,
        private commentService: CommentService,
        private jwtHelper: JwtHelper
    ) {}
    ngOnInit(): void {
        this.applicationService.getProfileApplication({ email: localStorage.getItem("email") }).subscribe(response => {
            this.application = response;
            this.commentService.getStudentComments({ applicationId: this.application.id }).subscribe(data => {
                this.comments = data;
            });
        });
    }

    commentsEmpty() {
        if (isNotNullOrUndefined(this.comments)) {
            return false;
        } else {
            return true;
        }
    }
}
