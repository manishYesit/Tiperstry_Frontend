import React from 'react';
import Container from "@material-ui/core/Container";
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import LinkIcon from '@material-ui/icons/Link';
import PropTypes from 'prop-types';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

import { makeStyles } from '@material-ui/core/styles';


function dfs(node, term, foundIDS) {
    // Implement your search functionality
    let isMatching = node.name && node.name.indexOf(term) > -1;

    if (Array.isArray(node.children)) {
        node.children.forEach((child) => {
            const hasMatchingChild = dfs(child, term, foundIDS);
            isMatching = isMatching || hasMatchingChild;
        });
    }

    // We will add any item if it matches our search term or if it has a children that matches our term
    if (isMatching && node.id) {
        foundIDS.push(node.id);
    }

    return isMatching;
}

function filter(data, matchedIDS) {
    return data
        .filter((item) => matchedIDS.indexOf(item.id) > -1)
        .map((item) => ({
            ...item,
            children: item.children ? filter(item.children, matchedIDS) : [],
        }));
}

function search(term) {
    // We wrap data in an object to match the node shape
    const dataNode = {
        children: data,
    };

    const matchedIDS = [];
    // find all items IDs that matches our search (or their children does)
    dfs(dataNode, term, matchedIDS);

    // filter the original data so that only matching items (and their fathers if they have) are returned
    return filter(data, matchedIDS);
}

const useTreeItemStyles = makeStyles((theme) => ({
    root: {
        color: theme.palette.text.secondary,
        '&:hover > $content': {
            backgroundColor: theme.palette.action.hover,
        },
        '&:focus > $content, &$selected > $content': {
            backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
            color: 'var(--tree-view-color)',
        },
        '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label': {
            backgroundColor: 'transparent',
        },
    },
    content: {
        color: theme.palette.text.secondary,
        borderTopRightRadius: theme.spacing(2),
        borderBottomRightRadius: theme.spacing(2),
        paddingRight: theme.spacing(1),
        fontWeight: theme.typography.fontWeightMedium,
        '$expanded > &': {
            fontWeight: theme.typography.fontWeightRegular,
        },
    },
    group: {
        marginLeft: 0,
        '& $content': {
            paddingLeft: theme.spacing(2),
        },
    },
    expanded: {},
    label: {
        fontWeight: 'inherit',
        color: 'inherit',
    },
    labelRoot: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0.5, 0),
    },
    labelIcon: {
        marginRight: theme.spacing(1),
    },
    labelInfo: {
        marginLeft: theme.spacing(4),
    },
    labelText: {
        fontWeight: 'inherit',
        flexGrow: 1,
    },
}));

function StyledTreeItem(props) {
    const classes = useTreeItemStyles();
    const { labelText, labelIcon: LabelIcon, labelInfo, color, bgColor, ...other } = props;

    return (
        <TreeItem
            label={
                <div className={classes.labelRoot}>
                    <LabelIcon color="inherit" className={classes.labelIcon} />
                    <Typography variant="body2" className={classes.labelText}>
                        {labelText}
                    </Typography>
                    <Typography variant="body2" className={classes.labelInfo}>
                        {labelInfo ? `@${labelInfo}` : null}
                    </Typography>
                </div>
            }
            style={{
                '--tree-view-color': color,
                '--tree-view-bg-color': bgColor,
            }}
            classes={{
                root: classes.root,
                content: classes.content,
                expanded: classes.expanded,
                group: classes.group,
                label: classes.label,
            }}
            {...other}
        />
    );
}

StyledTreeItem.propTypes = {
    bgColor: PropTypes.string,
    color: PropTypes.string,
    labelIcon: PropTypes.elementType.isRequired,
    labelInfo: PropTypes.string,
    labelText: PropTypes.string.isRequired,
};

const renderTree = (nodes) => (
    <StyledTreeItem
        nodeId={nodes.id}
        labelText={nodes.name}
        labelIcon={LinkIcon}
        labelInfo={nodes.username}
        color="#1a73e8"
        bgColor="#e8f0fe"
    >
        {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
    </StyledTreeItem>
);

const ReferalComponent = () => {
    const classes = makeStyles((theme) => ({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
    }))();

    const data = {
        id: 'root',
        name: 'Maison Armani',
        username:"lord_sky",
        children: [
            {
                id: '1',
                name: 'Child - 1',
                username:"masonarmani"
            },
            {
                id: '3',
                name: 'Child - 3',
                username:"prosper",
            }
        ],
    };

    return (
        <>
            <Container maxWidth="lg" className={classes.container} >
                <TreeView
                    className={classes.root}
                    defaultExpanded={['3']}
                    defaultCollapseIcon={<ArrowDropDownIcon />}
                    defaultExpandIcon={<ArrowRightIcon />}
                    defaultEndIcon={<div style={{ width: 24 }} />}
                >
                    <StyledTreeItem
                        nodeId="0"
                        labelText="Referals"
                        labelIcon={SupervisorAccountIcon}
                        color="#1a73e8"
                        bgColor="#e8f0fe"
                    >
                        {renderTree(data)}
                    </StyledTreeItem>
                </TreeView>
            </Container>
        </>
    )
}



export default ReferalComponent
