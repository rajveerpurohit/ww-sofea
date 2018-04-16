import React from 'react';
import { Link } from 'react-router';

const TableHeader = ({ listType, groupHeading, selectAllproducts, allSelectItemsLabel }) => {
  switch (listType) {
    case 'undeliverableProducts': return (
      <tr>
        <th className="table__th">Your {groupHeading} Items</th>
        <th className="table__th text-align-center">QTY</th>
        <th className="table__th text-align-center">Colour/ Size</th>
        <th className="table__th text-align-right">total&nbsp;Price</th>
      </tr>
    );
    case 'giftListItemsPage': return (
      <tr>
        <th width="100%">PRODUCT NAME</th>
        <th className="hide-on-mobi">REQUESTED QTY</th>
        <th className="hide-on-mobi">PURCHASED QTY</th>
        <th className="hide-on-mobi padL">QTY</th>
        <th className="hide-on-mobi">Colour/ Size</th>
        <th>UNIT&nbsp;PRICE</th>
        <th className="hide-on-mobi" nowrap width="18%">&nbsp;</th>
        <th className="hide-on-mobi">&nbsp;</th>
      </tr>
    );
    case 'giftListItemsAdminPage': return (
      <tr>
        <th width="100%">PRODUCT NAME</th>
        <th className="hide-on-mobi">REQUESTED QTY</th>
        <th className="hide-on-mobi">PURCHASED QTY</th>
        <th className="hide-on-mobi padL">QTY</th>
        <th className="hide-on-mobi">Colour/ Size</th>
        <th>UNIT&nbsp;PRICE</th>
        <th nowrap>&nbsp;</th>
      </tr>
    );
    case 'giftListDetailsPage': return (
      <tr>
        <th width="64%">Unpurchased items</th>
        <th width="14%" className="hide-on-mobi" nowrap>Requested QTY</th>
        <th width="15%" className="hide-on-mobi">Colour/ Size</th>
        <th width="8%" className="hide-on-mobi padL">&nbsp;</th>
        <th width="10%" className="">Unit&nbsp;Price</th>
        <th width="5%" nowrap>&nbsp;</th>
      </tr>
    );
    case 'favItems': return (
      <tr>
        <th width="60%">Product name</th>
        <th className="display-none--mobi-max">Colour/ Size</th>
        <th className="display-none--mobi-max" width="70px">Qty</th>
        <th className="display-none--mobi-max">Price</th>
        <th className="display-none--mobi-min text-align-right" colSpan="4">
          <Link onClick={selectAllproducts} className="selectALL text-medium">{allSelectItemsLabel}</Link>
        </th>
        {/* <th /> */}
        <th className="display-none--mobi-max" colSpan="2">
          <Link onClick={selectAllproducts} className="selectALL text-medium">{allSelectItemsLabel}</Link>
        </th>
      </tr>
    );
    case 'recipeIngredients': return (
      <tr>
        <th className="hide-on-mobi">PRODUCT NAME</th>
        <th className="hide-on-mobi">Qty</th>
        <th className="hide-on-mobi" wrap="nowrap">Price</th>
      </tr>
    );
    case 'purchaseHistory': return (
      <tr>
        <th>Your {groupHeading} Items</th>
        <th>Qty</th>
        <th>Colour/ Size</th>
        <th>unit&nbsp;Price&nbsp;</th>
        <th>total&nbsp;Price</th>
      </tr>
    );
    case 'shoppingListItemsPage': return (
      <tr>
        <th width="60%">Product name</th>
        <th className="display-none--mobi-max">Qty</th>
        <th className="display-none--mobi-max">Colour/ Size</th>
        <th className="display-none--mobi-max">Unit&nbsp;Price</th>
        <th className="display-none--mobi-min text-align-right" colSpan="4">
          <Link onClick={selectAllproducts} className="selectALL text-medium">{allSelectItemsLabel}</Link>
        </th>
        <th className="display-none--mobi-max">
          <Link onClick={selectAllproducts} className="selectALL text-medium">{allSelectItemsLabel}</Link>
        </th>
      </tr>
    );
    default: return (
      <tr>
        <th width="60%">Your {groupHeading} Items</th>
        <th className="hide-on-mobi" width="15%">&nbsp;</th>
        <th className="hide-on-mobi">Qty</th>
        <th className="hide-on-mobi">Colour/ Size</th>
        <th className="mobiPrice" nowrap>unit&nbsp;Price&nbsp;</th>
        <th className="hide-on-mobi" nowrap>total&nbsp;Price</th>
      </tr>
    );
  }
};
export default TableHeader;
