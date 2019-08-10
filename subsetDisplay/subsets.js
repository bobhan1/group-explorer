// @flow
/*::
import MathML from '../js/MathML.js';
import Menu from '../js/Menu.js';
import Template from '../js/Template.js';
import XMLGroup from '../js/XMLGroup.js';

import AbstractSubset from './AbstractSubset.js';
import ConjugacyClasses from './ConjugacyClasses.js';
import Cosets from './Cosets.js';
import OrderClasses from './OrderClasses.js';
import AbstractPartition from './AbstractPartition.js';
import PartitionSubset from './PartitionSubset.js';
import Subgroup from './Subgroup.js';
import SubsetEditor from './SubsetEditor.js';
import Subset from './Subset.js';
import SubsetMenu from './SubsetMenu.js';

var group: XMLGroup;

export default
 */
class SSD {
/*::
   static subsetsURL: string;
   static nextId: number;
   static nextSubsetIndex: number;
   static displayList: Array<AbstractSubset>;

   static AbstractSubset: Class<AbstractSubset>;
   static ConjugacyClasses: Class<ConjugacyClasses>;
   static Cosets: Class<Cosets>;
   static OrderClasses: Class<OrderClasses>;
   static AbstractPartition: Class<AbstractPartition>;
   static PartitionSubset: Class<PartitionSubset>;
   static Subgroup: Class<Subgroup>;
   static SubsetEditor: Class<SubsetEditor>;
   static Subset: Class<Subset>;
   static SubsetMenu: Class<SubsetMenu>;
 */
   static _init() {
      SSD.subsetsURL = './subsetDisplay/subsets.html';
   }

   static clearMenus() {
      $('#subset_page .highlighted').removeClass('highlighted');
      $('#subset_page .menu:visible').remove();
      $('#subset_page .elements').remove();
   }

   /* Load, initialize subset display */
   static load($subsetWrapper /*: JQuery */) /*: Promise<void> */ {
      return new Promise( (resolve, reject) => {
         $.ajax( { url: SSD.subsetsURL,
                   success: (data /*: string */) => {
                      $subsetWrapper.html(data);
                      SSD.setup_subset_page();
                      resolve();
                   },
                   error: (_jqXHR, _status, err) => {
                      reject(`Error loading ${SSD.subsetsURL} ${err === undefined ? '' : ': ' + err}`);
                   }
         } )
      } )
   }

   static setup_subset_page() {
      // Initialize list of all displayed subsets
      SSD.nextId = 0;
      SSD.nextSubsetIndex = 0;
      SSD.displayList = [];

      // clear out displayed lists; show '(None)' placeholders
      $('ul.subset_page_content li').remove();
      $('p.placeholder').show();

      // Display all subgroups
      SSD.Subgroup.displayAll();
      MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'subset_page']);

      // set up event listeners for menus
      SSD.SubsetMenu.init();   }
}

SSD._init();
