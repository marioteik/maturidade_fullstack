import { Component, OnDestroy, OnInit } from "@angular/core";
import { ContextHandlerService } from "../../context-handler/services/context-handler.service";
import { LayoutService } from "../../core/services/layout.service";

@Component({
  selector: "tk-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit, OnDestroy {
  constructor(
    private contextHandler: ContextHandlerService,
    private layoutService: LayoutService
  ) {}

  ngOnInit() {
    this.layoutService.cache([
      "layout.sidebars.filter",
      "layout.sidebars.primary",
      "layout.actions.filter"
    ]);

    this.contextHandler.updateValue("layout.sidebars.filter", false);
    this.contextHandler.updateValue("layout.actions.filter", false);
  }

  ngOnDestroy() {
    this.layoutService.restore([
      "layout.sidebars.filter",
      "layout.actions.filter"
    ]);
  }
}
