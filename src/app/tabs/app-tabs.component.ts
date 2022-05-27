import {
  Component,
  ContentChildren,
  QueryList,
  AfterContentInit,
  ViewChild,
  ComponentFactoryResolver,
  ViewContainerRef, ComponentRef,
} from '@angular/core';

import { TabComponent } from './tab/app-tab.component';
import { DynamicTabsDirective } from './dynamic-tabs.directive';
import Issue from "../state/issue.model";

@Component({
  selector: 'app-tabs',
  templateUrl: './app-tabs.component.html',
  styleUrls: ['app-tabs.component.sass']
})
export class TabsComponent implements AfterContentInit {
  public dynamicTabs: TabComponent[] = [];

  @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;

  @ViewChild(DynamicTabsDirective) dynamicTabPlaceholder!: DynamicTabsDirective;

  constructor(private _componentFactoryResolver: ComponentFactoryResolver) {}

  public ngAfterContentInit(): void {
    const activeTabs = this.tabs.filter(tab => tab.active);

    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  public openTab(title: string, template: any, data: Issue | null, isCloseable = false): void {
    const tabComponent: TabComponent | undefined = this.dynamicTabs.find((tab: TabComponent) => tab.title === title);

    if (tabComponent) {
      this.selectTab(tabComponent);
    } else {
      const componentFactory = this._componentFactoryResolver.resolveComponentFactory(
        TabComponent
      );

      const viewContainerRef: ViewContainerRef = this.dynamicTabPlaceholder.viewContainer;

      const componentRef: ComponentRef<TabComponent> = viewContainerRef.createComponent(componentFactory);

      const instance: TabComponent = componentRef.instance as TabComponent;
      instance.title = title;
      instance.template = template;
      instance.dataContext = data;
      instance.isCloseable = isCloseable;

      this.dynamicTabs.push(componentRef.instance as TabComponent);

      this.selectTab(this.dynamicTabs[this.dynamicTabs.length - 1]);
    }
  }

  public selectTab(tab: TabComponent): void {
    this.tabs.toArray().forEach(tab => (tab.active = false));
    this.dynamicTabs.forEach(tab => (tab.active = false));

    tab.active = true;
  }

  public closeTab(tab: TabComponent): void {
    for (let i = 0; i < this.dynamicTabs.length; i++) {
      if (this.dynamicTabs[i] === tab) {
        this.dynamicTabs.splice(i, 1);

        let viewContainerRef: ViewContainerRef = this.dynamicTabPlaceholder.viewContainer;
        viewContainerRef.remove(i);

        this.selectTab(this.tabs.first);
        break;
      }
    }
  }

  public closeActiveTab(): void {
    const activeTabs: TabComponent[] = this.dynamicTabs.filter(tab => tab.active);
    if (activeTabs.length > 0) {
      this.closeTab(activeTabs[0]);
    }
  }
}
